import { Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { Card, Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { COMMODITIES, LISTINGS, PRICE_SERIES, commodityById } from "@/lib/data";
import { formatIdr, formatKg } from "@/lib/format";
import type { CommodityId } from "@/lib/types";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function PasarPage() {
  const [filter, setFilter] = useState<CommodityId | "semua">("semua");
  const list = useMemo(
    () => (filter === "semua" ? LISTINGS : LISTINGS.filter((l) => l.commodityId === filter)),
    [filter],
  );

  return (
    <Page kicker="Rantai pasok" title="Pasar Tapsel">
      <p className="mb-4 text-sm text-fg-muted">
        Jual beli langsung. Harga terlihat. Asal panen bisa dilacak sampai kebun.
      </p>

      <Card className="mb-4">
        <p className="text-sm font-medium">Harga 5 bulan</p>
        <div className="mt-2 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PRICE_SERIES}>
              <CartesianGrid stroke="#e8e1d4" vertical={false} />
              <XAxis dataKey="minggu" tick={{ fontSize: 11, fill: "#5e5a53" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v) => formatIdr(Number(v))}
                contentStyle={{ background: "#fbf8f2", border: "1px solid #d9d1c3", borderRadius: 12 }}
              />
              <Line type="monotone" dataKey="kopi" stroke="#2f6b4a" strokeWidth={2} dot={false} name="Kopi" />
              <Line type="monotone" dataKey="kakao" stroke="#8a2f2a" strokeWidth={2} dot={false} name="Kakao" />
              <Line type="monotone" dataKey="karet" stroke="#8a857c" strokeWidth={2} dot={false} name="Karet" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        <Chip active={filter === "semua"} onClick={() => setFilter("semua")}>
          Semua
        </Chip>
        {COMMODITIES.slice(0, 8).map((c) => (
          <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
            {c.localName}
          </Chip>
        ))}
      </div>

      <ul className="space-y-3">
        {list.map((l) => {
          const c = commodityById[l.commodityId];
          return (
            <li key={l.id}>
              <Link to="/pasar/$id" params={{ id: l.id }} className="block">
                <Card className="flex gap-3 p-3">
                  <img src={l.image} alt="" className="size-20 rounded-xl object-cover" loading="lazy" decoding="async" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{l.title}</p>
                    <p className="text-xs text-fg-muted">
                      {l.seller} · {l.kecamatan}
                    </p>
                    <p className="mt-1 text-sm font-medium tabular-nums">
                      {formatIdr(l.priceIdr)}
                      <span className="font-normal text-fg-muted"> / kg</span>
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      <Badge>{formatKg(l.qty)}</Badge>
                      <Badge tone="leaf">{c.localName}</Badge>
                    </div>
                  </div>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "h-9 shrink-0 rounded-full bg-forest px-3.5 text-sm font-medium text-primary-foreground"
          : "h-9 shrink-0 rounded-full bg-bg-elevated px-3.5 text-sm text-fg-muted shadow-[var(--shadow-border)]"
      }
    >
      {children}
    </button>
  );
}
