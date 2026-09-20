import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CloudSun, Coins, Store } from "lucide-react";
import { useEffect } from "react";
import { Card, Meter, Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { COMMODITIES, KOPERASI_STOCK, VILLAGE_STATS, WEATHER, commodityById } from "@/lib/data";
import { formatIdr, formatKg } from "@/lib/format";
import { useApp, useMe } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const hasOnboarded = useApp((s) => s.hasOnboarded);
  const nav = useNavigate();
  const role = useApp((s) => s.role);

  useEffect(() => {
    if (!hasOnboarded) nav({ to: "/mulai" });
  }, [hasOnboarded, nav]);

  if (!hasOnboarded) return null;
  if (role === "investor") return <InvestorHome />;
  if (role === "koperasi") return <KoperasiHome />;
  if (role === "pemerintah") return <PemdaHome />;
  return <PetaniHome />;
}

function PetaniHome() {
  const me = useMe();
  const tokens = useApp((s) => s.tokens);
  const wallet = useApp((s) => s.walletIdr);
  const posts = useApp((s) => s.posts);
  const pools = useApp((s) => s.pools);
  const kg = tokens.reduce((s, t) => s + t.qty, 0);
  const today = WEATHER[0]!;

  return (
    <Page>
      <div className="stagger-in space-y-4">
        <section className="relative overflow-hidden rounded-2xl bg-forest text-primary-foreground">
          <img
            src="/images/hero-tapsel.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="relative p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-leaf-soft">Horas, dongan</p>
            <h1 className="mt-1 font-display text-2xl font-semibold">{me.name.split(" ")[0]}</h1>
            <p className="mt-1 text-sm text-primary-foreground/80">
              {me.village}, {me.kecamatan} · {me.title}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Stat label="Dompet" value={formatIdr(wallet, true)} />
              <Stat label="Token panen" value={formatKg(kg)} />
            </div>
          </div>
        </section>

        <Link
          to="/cuaca"
          className="flex items-center justify-between rounded-2xl bg-bg-elevated px-4 py-3 shadow-[var(--shadow-border)]"
        >
          <span className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-leaf/12 text-leaf">
              <CloudSun className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-medium">Sipirok hari ini · {today.temp}°</span>
              <span className="block text-xs text-fg-muted">
                {today.label} · {today.rainMm} mm · ramalan 7 hari
              </span>
            </span>
          </span>
        </Link>

        <section>
          <RowTitle title="Harga pasar Tapsel" to="/pasar" />
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {COMMODITIES.slice(0, 6).map((c) => (
              <Link
                key={c.id}
                to="/pasar"
                className="min-w-36 shrink-0 rounded-2xl bg-bg-elevated p-3 shadow-[var(--shadow-border)]"
              >
                <p className="text-xs text-fg-muted">{c.name}</p>
                <p className="mt-1 font-medium tabular-nums">{formatIdr(c.priceIdr)}</p>
                <p className={c.changePct >= 0 ? "text-xs text-leaf" : "text-xs text-ulos"}>
                  {c.changePct >= 0 ? "+" : ""}
                  {c.changePct}%
                </p>
              </Link>
            ))}
          </div>
        </section>

        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Token panen saya</h2>
            <Link to="/token" className="text-sm font-medium text-leaf">
              Kelola
            </Link>
          </div>
          {tokens.length === 0 ? (
            <p className="text-sm text-fg-muted">Belum ada token. Ubah panen jadi aset di menu Token.</p>
          ) : (
            <ul className="space-y-3">
              {tokens.map((t) => {
                const c = commodityById[t.commodityId];
                return (
                  <li key={t.id} className="flex items-center gap-3">
                    <img src={c.image} alt="" className="size-12 rounded-lg object-cover" loading="lazy" decoding="async" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-fg-muted">
                        {t.id} · {t.grade}
                      </p>
                    </div>
                    <p className="text-sm font-medium tabular-nums">{formatKg(t.qty)}</p>
                  </li>
                );
              })}
            </ul>
          )}
          <Link
            to="/token"
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-leaf text-sm font-medium text-primary-foreground hover:bg-leaf-soft"
          >
            <Coins className="size-4" /> Ubah panen jadi token
          </Link>
        </Card>

        <section>
          <RowTitle title="Gotong royong" to="/gotong" />
          <div className="mt-2 space-y-2">
            {pools.slice(0, 2).map((p) => (
              <Link key={p.id} to="/gotong" className="block">
                <Card>
                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="mt-0.5 text-xs text-fg-muted">{p.village}</p>
                  <div className="mt-2">
                    <Meter value={(p.raisedIdr / p.targetIdr) * 100} />
                  </div>
                  <p className="mt-2 text-xs tabular-nums text-fg-muted">
                    {formatIdr(p.raisedIdr, true)} dari {formatIdr(p.targetIdr, true)}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <Card>
          <RowTitle title="Suara desa" to="/komunitas" />
          <p className="mt-2 text-sm leading-relaxed text-fg">{posts[0]?.body}</p>
          <p className="mt-2 text-xs text-fg-muted">
            {posts[0]?.author} · {posts[0]?.village}
          </p>
        </Card>

        <Link to="/konsep" className="block">
          <Card className="bg-forest text-primary-foreground">
            <p className="text-xs uppercase tracking-wider text-leaf-soft">Gerakan</p>
            <p className="font-display text-lg font-semibold">Visi, peta jalan, dan cara kerja</p>
            <p className="mt-1 text-sm text-primary-foreground/70">
              Baca konsep lengkap AGRI TAPSEL — dari adat sampai regulasi token.
            </p>
          </Card>
        </Link>
      </div>
    </Page>
  );
}

function InvestorHome() {
  const me = useMe();
  const wallet = useApp((s) => s.walletIdr);
  const campaigns = useApp((s) => s.campaigns);
  const invested = useApp((s) => s.invested);
  const shares = useApp((s) => s.shares);
  const totalIn = Object.values(invested).reduce((a, b) => a + b, 0);

  return (
    <Page>
      <div className="stagger-in space-y-4">
        <section className="rounded-2xl bg-forest p-5 text-primary-foreground">
          <p className="text-xs uppercase tracking-wider text-leaf-soft">Diaspora Tapsel</p>
          <h1 className="mt-1 font-display text-2xl font-semibold">{me.name}</h1>
          <p className="text-sm text-primary-foreground/75">{me.bio}</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Stat label="Saldo" value={formatIdr(wallet, true)} />
            <Stat label="Sudah danai" value={formatIdr(totalIn, true)} />
          </div>
        </section>
        <Card>
          <h2 className="font-display text-lg font-semibold">Bagian kebun</h2>
          {shares.map((s) => (
            <div key={s.id} className="mt-3">
              <p className="text-sm font-medium">{s.title}</p>
              <p className="text-xs text-fg-muted">
                {s.sharesOwned} dari {s.sharesTotal} bagian · proyeksi {s.expectedYieldPct}% / tahun
              </p>
              <div className="mt-2">
                <Meter value={(s.sharesOwned / s.sharesTotal) * 100} />
              </div>
            </div>
          ))}
        </Card>
        <RowTitle title="Butuh dana tanam" to="/dana" />
        {campaigns.map((c) => (
          <Link key={c.id} to="/dana/$id" params={{ id: c.id }} className="block">
            <Card className="flex gap-3 p-3">
              <img src={c.image} alt="" className="size-16 rounded-lg object-cover" loading="lazy" decoding="async" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{c.title}</p>
                <p className="text-xs text-fg-muted">
                  {c.kecamatan} · bagi hasil {c.sharePct}%
                </p>
                <div className="mt-2">
                  <Meter value={(c.raisedIdr / c.targetIdr) * 100} />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Page>
  );
}

function KoperasiHome() {
  const me = useMe();
  return (
    <Page>
      <div className="stagger-in space-y-4">
        <section className="rounded-2xl bg-forest p-5 text-primary-foreground">
          <p className="text-xs uppercase tracking-wider text-leaf-soft">Gudang & resi</p>
          <h1 className="font-display text-2xl font-semibold">{me.title}</h1>
          <p className="text-sm text-primary-foreground/75">{me.bio}</p>
        </section>
        <Card>
          <h2 className="font-display text-lg font-semibold">Stok fisik = token beredar</h2>
          <p className="mt-1 text-xs text-fg-muted">
            Setiap kilo di gudang harus sama dengan token di jaringan. Selisih ditandai.
          </p>
          <ul className="mt-3 space-y-3">
            {KOPERASI_STOCK.map((s) => {
              const c = commodityById[s.commodityId];
              return (
                <li key={s.commodityId} className="flex items-center gap-3">
                  <img src={c.image} alt="" className="size-12 rounded-lg object-cover" loading="lazy" decoding="async" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-leaf">
                      Cocok · gudang {s.kg} kg = {s.tokens} token
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
        <div className="grid grid-cols-2 gap-2">
          <Link to="/token">
            <Card className="h-full">
              <Coins className="size-5 text-leaf" />
              <p className="mt-2 text-sm font-medium">Terbitkan token anggota</p>
            </Card>
          </Link>
          <Link to="/pasar">
            <Card className="h-full">
              <Store className="size-5 text-leaf" />
              <p className="mt-2 text-sm font-medium">Jual stok koperasi</p>
            </Card>
          </Link>
        </div>
      </div>
    </Page>
  );
}

function PemdaHome() {
  const me = useMe();
  const aktif = VILLAGE_STATS.filter((v) => v.aktif).length;
  return (
    <Page wide>
      <div className="stagger-in space-y-4">
        <section className="rounded-2xl bg-forest p-5 text-primary-foreground">
          <p className="text-xs uppercase tracking-wider text-leaf-soft">Dinas Pertanian Tapsel</p>
          <h1 className="font-display text-2xl font-semibold">{me.name}</h1>
          <p className="text-sm text-primary-foreground/75">{me.bio}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Stat label="Desa aktif" value={`${aktif}/6`} />
            <Stat label="Petani" value="362" />
            <Stat label="Token" value="100" />
          </div>
        </section>
        <Card>
          <h2 className="font-display text-lg font-semibold">Aktivasi desa</h2>
          <ul className="mt-3 divide-y divide-border">
            {VILLAGE_STATS.map((v) => (
              <li key={v.desa} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-sm font-medium">{v.desa}</p>
                  <p className="text-xs text-fg-muted">
                    {v.kec} · {v.petani} petani · {v.token} token
                  </p>
                </div>
                <Badge tone={v.aktif ? "leaf" : "muted"}>{v.aktif ? "Aktif" : "Antrian"}</Badge>
              </li>
            ))}
          </ul>
        </Card>
        <div className="grid gap-2 md:grid-cols-2">
          <Link to="/belajar">
            <Card>
              <p className="text-sm font-medium">Modul penyuluh</p>
              <p className="mt-1 text-xs text-fg-muted">5 materi bahasa sederhana + istilah Batak.</p>
            </Card>
          </Link>
          <Link to="/konsep">
            <Card>
              <p className="text-sm font-medium">Peta jalan 12 bulan</p>
              <p className="mt-1 text-xs text-fg-muted">MVP ke perluasan komoditas dan diaspora.</p>
            </Card>
          </Link>
        </div>
      </div>
    </Page>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-forest-deep/80 px-3 py-2.5">
      <p className="text-xs text-primary-foreground/60">{label}</p>
      <p className="font-medium tabular-nums">{value}</p>
    </div>
  );
}

function RowTitle({ title, to }: { title: string; to: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <Link to={to} className="text-sm font-medium text-leaf">
        Lihat
      </Link>
    </div>
  );
}
