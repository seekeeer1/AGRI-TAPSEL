import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Card, Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LISTINGS, TRACES, commodityById } from "@/lib/data";
import { formatIdr } from "@/lib/format";
import { useApp } from "@/lib/store";

export default function ListingDetail() {
  const { id } = useParams({ from: "/pasar/$id" });
  const listing = LISTINGS.find((l) => l.id === id);
  const buy = useApp((s) => s.buyListing);
  const [qty, setQty] = useState(10);

  if (!listing) {
    return (
      <Page title="Tidak ditemukan">
        <Link to="/pasar" className="text-sm text-leaf">
          Kembali ke pasar
        </Link>
      </Page>
    );
  }

  const c = commodityById[listing.commodityId];
  const steps = TRACES[listing.traceId] ?? TRACES["TRC-KOPI-421"]!;
  const total = qty * listing.priceIdr;

  return (
    <Page kicker={listing.kecamatan} title={listing.title}>
      <img
        src={listing.image}
        alt={listing.title}
        className="mb-4 h-48 w-full rounded-2xl object-cover"
 loading="lazy" decoding="async" />
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge tone="leaf">{c.name}</Badge>
        <Badge>{listing.grade}</Badge>
      </div>
      <p className="text-2xl font-semibold tabular-nums">{formatIdr(listing.priceIdr)} / kg</p>
      <p className="text-sm text-fg-muted">
        {listing.seller} · stok {listing.qty} kg · {listing.koperasi}
      </p>

      <Card className="mt-5">
        <p className="text-sm font-medium">Beli (demo)</p>
        <div className="mt-2 flex gap-2">
          <Input
            type="number"
            min={1}
            max={listing.qty}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
          <Button
            className="shrink-0"
            disabled={!Number.isFinite(qty) || qty < 1 || qty > listing.qty}
            onClick={() => {
              const ok = buy(listing.id, qty, listing.priceIdr, listing.title);
              toast[ok ? "success" : "error"](
                ok ? `Berhasil beli ${qty} kg.` : "Saldo tidak cukup atau stok kurang.",
              );
            }}
          >
            Bayar {formatIdr(total, true)}
          </Button>
        </div>
      </Card>

      <h2 className="mt-6 font-display text-lg font-semibold">Jejak dari kebun</h2>
      <ol className="mt-3 space-y-0">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="mt-1 size-2.5 rounded-full bg-leaf" />
              {i < steps.length - 1 ? <span className="w-px flex-1 bg-border" /> : null}
            </div>
            <div className="pb-4">
              <p className="text-xs text-fg-subtle">{s.at}</p>
              <p className="text-sm font-medium">{s.title}</p>
              <p className="text-xs text-fg-muted">{s.place}</p>
              <p className="mt-0.5 text-sm text-fg-muted">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </Page>
  );
}
