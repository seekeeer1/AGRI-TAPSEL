import { Link } from "@tanstack/react-router";
import { Card, Meter, Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { formatIdr } from "@/lib/format";
import { useApp } from "@/lib/store";

export default function DanaPage() {
  const campaigns = useApp((s) => s.campaigns);
  const invested = useApp((s) => s.invested);

  return (
    <Page kicker="Bagi hasil adil" title="Pendanaan komunitas">
      <p className="mb-4 text-sm text-fg-muted">
        Investor — termasuk anak Tapsel di rantau — membiayai tanam atau olah. Petani tidak kehilangan
        lahan. Bagi hasil tertulis di perjanjian, berjalan otomatis saat panen terjual.
      </p>
      <ul className="space-y-3">
        {campaigns.map((c) => (
          <li key={c.id}>
            <Link to="/dana/$id" params={{ id: c.id }} className="block">
              <Card className="p-3">
                <img src={c.image} alt="" className="mb-3 h-36 w-full rounded-xl object-cover" loading="lazy" decoding="async" />
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-medium">{c.title}</h2>
                  <Badge tone={c.risk === "rendah" ? "leaf" : "warn"}>Risiko {c.risk}</Badge>
                </div>
                <p className="text-xs text-fg-muted">
                  {c.village}, {c.kecamatan} · {c.tenorMonths} bulan · bagi hasil {c.sharePct}%
                </p>
                <div className="mt-3">
                  <Meter value={(c.raisedIdr / c.targetIdr) * 100} />
                  <p className="mt-1 text-xs tabular-nums text-fg-muted">
                    {formatIdr(c.raisedIdr, true)} dari {formatIdr(c.targetIdr, true)} · {c.investors}{" "}
                    orang
                    {invested[c.id] ? ` · Anda ${formatIdr(invested[c.id]!, true)}` : ""}
                  </p>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}
