import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, Meter, Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { COMMODITIES, commodityById } from "@/lib/data";
import { formatDate, formatIdr, formatKg, shortHash } from "@/lib/format";
import { useApp } from "@/lib/store";
import type { CommodityId } from "@/lib/types";

export default function TokenPage() {
  const tokens = useApp((s) => s.tokens);
  const shares = useApp((s) => s.shares);
  const mint = useApp((s) => s.mintHarvest);
  const buyShares = useApp((s) => s.buyShares);
  const [cid, setCid] = useState<CommodityId>("kopi-arabika");
  const [qty, setQty] = useState(50);
  const [grade, setGrade] = useState("G1 washed");
  const [minted, setMinted] = useState<string | null>(null);

  const c = commodityById[cid];

  return (
    <Page kicker="Aset nyata" title="Token panen & kebun">
      <p className="mb-5 text-sm text-fg-muted">
        Token adalah surat digital atas barang yang ada di gudang koperasi. 1 token = 1 {c.unit}{" "}
        {c.name}. Bukan uang mainan.
      </p>

      <Card className="mb-4">
        <h2 className="font-display text-lg font-semibold">Ubah panen jadi token</h2>
        <p className="mt-1 text-xs text-fg-muted">
          Koperasi menimbang dulu. Setelah cocok, token terbit di jaringan Polygon.
        </p>
        <div className="mt-4 grid gap-3">
          <div>
            <Label>Komoditas</Label>
            <select
              className="mt-1 flex h-11 w-full rounded-lg bg-bg px-3 text-sm shadow-[var(--shadow-border)]"
              value={cid}
              onChange={(e) => setCid(e.target.value as CommodityId)}
            >
              {COMMODITIES.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Berat ditimbang koperasi (kg)</Label>
            <Input
              className="mt-1"
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Mutu</Label>
            <Input className="mt-1" value={grade} onChange={(e) => setGrade(e.target.value)} />
          </div>
          <p className="text-sm text-fg-muted">
            Nilai pasar sekarang {formatIdr(qty * c.priceIdr)} · {c.tokenUnit}
          </p>
          <Button
            onClick={() => {
              if (qty < 1) return;
              const t = mint({ commodityId: cid, qty, grade });
              setMinted(t.id);
              toast.success(`Token ${t.id} terbit. ${formatKg(qty)} disimpan gudang.`);
            }}
          >
            Terbitkan token
          </Button>
          {minted ? (
            <p className="flex items-center gap-2 text-sm text-leaf">
              <ShieldCheck className="size-4" /> {minted} sudah tercatat.
            </p>
          ) : null}
        </div>
      </Card>

      <h2 className="mb-2 font-display text-lg font-semibold">Token saya</h2>
      <ul className="space-y-2">
        {tokens.map((t) => {
          const cm = commodityById[t.commodityId];
          return (
            <li key={t.id}>
              <Card className="flex gap-3 p-3">
                <img src={cm.image} alt="" className="size-16 rounded-lg object-cover" loading="lazy" decoding="async" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{cm.name}</p>
                    <Badge tone={t.status === "terkunci" ? "warn" : "leaf"}>
                      {t.status}
                    </Badge>
                  </div>
                  <p className="text-sm tabular-nums">{formatKg(t.qty)}</p>
                  <p className="text-xs text-fg-muted">
                    {t.id} · {formatDate(t.mintedAt)} · {shortHash(t.txHash)}
                  </p>
                  <p className="text-xs text-fg-muted">
                    {t.koperasi} · {t.village}
                  </p>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>

      <h2 className="mt-6 mb-2 font-display text-lg font-semibold">Bagian kebun (bukan sertifikat tanah)</h2>
      <p className="mb-3 text-sm text-fg-muted">
        Yang dibeli adalah hak bagi hasil kebun yang dikelola koperasi. Sertifikat tanah tetap atas
        nama petani/koperasi sesuai UUPA.
      </p>
      {shares.map((s) => (
        <Card key={s.id} className="mb-3">
          <p className="font-medium">{s.title}</p>
          <p className="text-xs text-fg-muted">
            {s.hectares} ha · {s.village}, {s.kecamatan}
          </p>
          <p className="mt-2 text-sm tabular-nums">
            Punya {s.sharesOwned} / {s.sharesTotal} bagian · {formatIdr(s.pricePerShare)} / bagian
          </p>
          <Meter value={(s.sharesOwned / s.sharesTotal) * 100} />
          <p className="mt-1 text-xs text-fg-muted">Proyeksi bagi hasil {s.expectedYieldPct}% / tahun</p>
          <Button
            className="mt-3"
            size="sm"
            onClick={() => {
              const ok = buyShares(s.id, 1);
              toast[ok ? "success" : "error"](
                ok ? "1 bagian kebun ditambahkan." : "Saldo dompet tidak cukup.",
              );
            }}
          >
            Beli 1 bagian
          </Button>
        </Card>
      ))}
    </Page>
  );
}
