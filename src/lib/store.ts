import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CAMPAIGNS,
  INITIAL_SHARES,
  INITIAL_TOKENS,
  INITIAL_TX,
  LISTINGS,
  PEOPLE,
  POOLS,
  POSTS,
} from "./data";
import type {
  Campaign,
  CommodityId,
  GotongPool,
  HarvestToken,
  LandShare,
  Post,
  Role,
  Tx,
} from "./types";

interface AppState {
  hasOnboarded: boolean;
  role: Role;
  walletIdr: number;
  tokens: HarvestToken[];
  shares: LandShare[];
  posts: Post[];
  pools: GotongPool[];
  campaigns: Campaign[];
  invested: Record<string, number>;
  ownedListings: string[];
  completedLessons: string[];
  txs: Tx[];
  completeOnboarding: (role: Role) => void;
  setRole: (role: Role) => void;
  likePost: (id: string) => void;
  addPost: (body: string, topic: string) => void;
  joinPool: (id: string, amount: number) => boolean;
  mintHarvest: (input: {
    commodityId: CommodityId;
    qty: number;
    grade: string;
  }) => HarvestToken;
  buyListing: (id: string, qty: number, priceIdr: number, title: string) => boolean;
  invest: (id: string, amount: number) => boolean;
  buyShares: (id: string, count: number) => boolean;
  completeLesson: (slug: string) => void;
  payQris: (label: string, amount: number) => boolean;
  resetDemo: () => void;
}

function personFor(role: Role) {
  return PEOPLE.find((p) => p.role === role) ?? PEOPLE[0]!;
}

function isPositiveAmount(n: number): boolean {
  return Number.isFinite(n) && n > 0;
}

function tx(label: string, amountIdr: number, kind: Tx["kind"]): Tx {
  return {
    id: `tx-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
    at: new Date().toISOString(),
    label,
    amountIdr,
    kind,
  };
}

const initial = {
  hasOnboarded: false,
  role: "petani" as Role,
  walletIdr: 4_250_000,
  tokens: INITIAL_TOKENS,
  shares: INITIAL_SHARES,
  posts: POSTS,
  pools: POOLS,
  campaigns: CAMPAIGNS,
  invested: {} as Record<string, number>,
  ownedListings: [] as string[],
  completedLessons: ["gotong-royong-digital"],
  txs: INITIAL_TX,
};

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      ...initial,
      completeOnboarding: (role) => set({ hasOnboarded: true, role }),
      setRole: (role) => set({ role }),
      likePost: (id) =>
        set({
          posts: get().posts.map((p) =>
            p.id === id
              ? {
                  ...p,
                  liked: !p.liked,
                  likes: p.liked ? p.likes - 1 : p.likes + 1,
                }
              : p,
          ),
        }),
      addPost: (body, topic) => {
        const me = personFor(get().role);
        const post: Post = {
          id: `p-${Date.now()}`,
          author: me.name,
          roleLabel: me.title,
          village: me.village,
          kecamatan: me.kecamatan,
          body,
          topic,
          likes: 0,
          comments: 0,
          liked: false,
          createdAt: new Date().toISOString(),
        };
        set({ posts: [post, ...get().posts] });
      },
      joinPool: (id, amount) => {
        if (!isPositiveAmount(amount)) return false;
        const { walletIdr, pools, txs } = get();
        if (walletIdr < amount) return false;
        set({
          walletIdr: walletIdr - amount,
          pools: pools.map((p) =>
            p.id === id
              ? {
                  ...p,
                  joined: true,
                  raisedIdr: p.raisedIdr + amount,
                  members: p.joined ? p.members : p.members + 1,
                }
              : p,
          ),
          txs: [tx(`Iuran ${pools.find((p) => p.id === id)?.title ?? "gotong royong"}`, amount, "keluar"), ...txs],
        });
        return true;
      },
      mintHarvest: ({ commodityId, qty, grade }) => {
        const me = personFor(get().role);
        const token: HarvestToken = {
          id: `TAP-${commodityId.slice(0, 4).toUpperCase()}-${Math.floor(Math.random() * 90000 + 10000)}`,
          commodityId,
          qty,
          farmerName: me.name,
          village: me.village,
          kecamatan: me.kecamatan,
          koperasi: "Koperasi Tani Dolok",
          mintedAt: new Date().toISOString(),
          status: "tersimpan",
          txHash: `0x${crypto.randomUUID().replaceAll("-", "").slice(0, 40)}`,
          grade,
        };
        set({ tokens: [token, ...get().tokens] });
        return token;
      },
      buyListing: (id, qty, priceIdr, title) => {
        if (!isPositiveAmount(qty)) return false;
        const listing = LISTINGS.find((l) => l.id === id);
        if (listing && qty > listing.qty) return false;
        const total = qty * priceIdr;
        const { walletIdr, txs, ownedListings } = get();
        if (walletIdr < total) return false;
        set({
          walletIdr: walletIdr - total,
          ownedListings: ownedListings.includes(id) ? ownedListings : [...ownedListings, id],
          txs: [tx(`Beli ${qty} kg · ${title}`, total, "keluar"), ...txs],
        });
        return true;
      },
      invest: (id, amount) => {
        if (!isPositiveAmount(amount)) return false;
        const { walletIdr, campaigns, invested, txs } = get();
        if (walletIdr < amount) return false;
        set({
          walletIdr: walletIdr - amount,
          invested: { ...invested, [id]: (invested[id] ?? 0) + amount },
          campaigns: campaigns.map((c) =>
            c.id === id
              ? {
                  ...c,
                  raisedIdr: c.raisedIdr + amount,
                  investors: invested[id] ? c.investors : c.investors + 1,
                }
              : c,
          ),
          txs: [tx(`Danai ${campaigns.find((c) => c.id === id)?.title ?? "kampanye"}`, amount, "keluar"), ...txs],
        });
        return true;
      },
      buyShares: (id, count) => {
        if (!isPositiveAmount(count) || !Number.isInteger(count)) return false;
        const share = get().shares.find((s) => s.id === id);
        if (!share) return false;
        const total = count * share.pricePerShare;
        if (get().walletIdr < total) return false;
        set({
          walletIdr: get().walletIdr - total,
          shares: get().shares.map((s) =>
            s.id === id ? { ...s, sharesOwned: s.sharesOwned + count } : s,
          ),
          txs: [tx(`Beli ${count} bagian kebun ${share.title}`, total, "keluar"), ...get().txs],
        });
        return true;
      },
      completeLesson: (slug) => {
        const { completedLessons } = get();
        if (completedLessons.includes(slug)) return;
        set({ completedLessons: [...completedLessons, slug] });
      },
      payQris: (label, amount) => {
        if (!isPositiveAmount(amount)) return false;
        if (get().walletIdr < amount) return false;
        set({
          walletIdr: get().walletIdr - amount,
          txs: [tx(label, amount, "keluar"), ...get().txs],
        });
        return true;
      },
      resetDemo: () => set({ ...initial, hasOnboarded: true, role: get().role }),
    }),
    { name: "agri-tapsel-demo" },
  ),
);

export function useMe() {
  const role = useApp((s) => s.role);
  return personFor(role);
}
