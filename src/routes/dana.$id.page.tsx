import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Card, Meter, Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { commodityById } from "@/lib/data";
import { formatIdr } from "@/lib/format";
import { useApp } from "@/lib/store";

export default function DanaDetail() {
  const { id } = useParams({ from: "/dana/$id" });
  const campaign = useApp((s) => s.campaigns.find((c) => c.id === id));
  const invest = useApp((s) => s.invest);
  const mine = useApp((s) => s.invested[id] ?? 0);
  const [amount, setAmount] = useState(500000);

  if (!campaign) {
    return (
      <Page title="Tidak ditemukan">
        <Link to="/dana" className="text-sm text-leaf">
          Kembali
        </Link>
      </Page>
    );
  }

  const c = commodityById[campaign.commodityId];

  return (
    <Page kicker={campaign.kecamatan} title={campaign.title}>
      <img src={campaign.image} alt="" className="mb-4 h-48 w-full rounded-2xl object-cover" loading="lazy" decoding="async" />
      <div className="mb-3 flex gap-2">
        <Badge tone="leaf">{c.name}</Badge>
        <Badge>Bagi hasil {campaign.sharePct}%</Badge>
        <Badge tone={campaign.risk === "rendah" ? "muted" : "warn"}>Risiko {campaign.risk}</Badge>
      </div>
      <p className="text-sm leading-relaxed text-fg-muted">{campaign.story}</p>
      <div className="mt-4">
        <Meter value={(campaign.raisedIdr / campaign.targetIdr) * 100} />
        <p className="mt-1 text-sm tabular-nums">
          {formatIdr(campaign.raisedIdr)} / {formatIdr(campaign.targetIdr)}
        </p>
      </div>
      <Card className="mt-5">
        <p className="text-sm font-medium">Ikut mendanai</p>
        <p className="text-xs text-fg-muted">
          Tenor {campaign.tenorMonths} bulan. Jika panen gagal, risiko dibagi sesuai perjanjian —
          pokok petani tidak disita.
        </p>
        <Input
          className="mt-3"
          type="number"
          min={100000}
          step={100000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Button
          className="mt-3 w-full"
          disabled={!Number.isFinite(amount) || amount < 100000}
          onClick={() => {
            const ok = invest(campaign.id, amount);
            toast[ok ? "success" : "error"](
              ok ? `Dana ${formatIdr(amount)} tercatat.` : "Saldo tidak cukup.",
            );
          }}
        >
          Danai {formatIdr(amount, true)}
        </Button>
        {mine > 0 ? (
          <p className="mt-2 text-sm text-leaf">Anda sudah menaruh {formatIdr(mine)} di sini.</p>
        ) : null}
      </Card>
    </Page>
  );
}
