export type Role = "petani" | "investor" | "koperasi" | "pemerintah";

export type CommodityId =
  | "kopi-arabika"
  | "kopi-robusta"
  | "kakao"
  | "karet"
  | "sawit"
  | "padi"
  | "salak"
  | "kulit-manis"
  | "kemiri"
  | "aren";

export interface Commodity {
  id: CommodityId;
  name: string;
  localName: string;
  unit: string;
  tokenUnit: string;
  priceIdr: number;
  changePct: number;
  image: string;
  hub: string;
  color: string;
}

export interface HarvestToken {
  id: string;
  commodityId: CommodityId;
  qty: number;
  farmerName: string;
  village: string;
  kecamatan: string;
  koperasi: string;
  mintedAt: string;
  status: "tersimpan" | "dijual" | "terkunci";
  txHash: string;
  grade: string;
}

export interface LandShare {
  id: string;
  title: string;
  commodityId: CommodityId;
  village: string;
  kecamatan: string;
  hectares: number;
  sharesTotal: number;
  sharesOwned: number;
  pricePerShare: number;
  expectedYieldPct: number;
  koperasi: string;
}

export interface Listing {
  id: string;
  commodityId: CommodityId;
  title: string;
  seller: string;
  village: string;
  kecamatan: string;
  qty: number;
  priceIdr: number;
  grade: string;
  koperasi: string;
  traceId: string;
  image: string;
}

export interface TraceStep {
  at: string;
  title: string;
  place: string;
  note: string;
}

export interface Post {
  id: string;
  author: string;
  roleLabel: string;
  village: string;
  kecamatan: string;
  body: string;
  topic: string;
  likes: number;
  comments: number;
  liked: boolean;
  createdAt: string;
}

export interface GotongPool {
  id: string;
  title: string;
  purpose: string;
  village: string;
  targetIdr: number;
  raisedIdr: number;
  members: number;
  due: string;
  joined: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  commodityId: CommodityId;
  village: string;
  kecamatan: string;
  story: string;
  targetIdr: number;
  raisedIdr: number;
  investors: number;
  sharePct: number;
  tenorMonths: number;
  risk: "rendah" | "sedang";
  image: string;
}

export interface Lesson {
  slug: string;
  title: string;
  minutes: number;
  category: string;
  summary: string;
  body: string[];
  terms: { batak: string; arti: string }[];
}

export interface Tx {
  id: string;
  at: string;
  label: string;
  amountIdr: number;
  kind: "masuk" | "keluar";
}

export interface WeatherDay {
  day: string;
  temp: number;
  rainMm: number;
  label: string;
}

export interface Person {
  id: string;
  name: string;
  role: Role;
  title: string;
  village: string;
  kecamatan: string;
  bio: string;
}
