import { useMemo, useState } from "react";
import { Card, Page } from "@/components/shell";
import { Input, Label } from "@/components/ui/input";
import { CALC_PRESETS, COMMODITIES, commodityById } from "@/lib/data";
import { formatIdr } from "@/lib/format";
import type { CommodityId } from "@/lib/types";

export default function HitungPage() {
  const [cid, setCid] = useState<CommodityId>("kopi-arabika");
  const [ha, setHa] = useState(1.8);
  const preset = CALC_PRESETS[cid];
  const c = commodityById[cid];

  const result = useMemo(() => {
    const cost = preset.costPerHa * ha;
    const yieldKg = preset.yieldKg * ha;
    const revenue = yieldKg * c.priceIdr;
    const profit = revenue - cost;
    const perMonth = profit / preset.months;
    return { cost, yieldKg, revenue, profit, perMonth };
  }, [ha, preset, c.priceIdr]);

  return (
    <Page kicker="Hitung sebelum tanam" title="Biaya & untung">
      <p className="mb-4 text-sm text-fg-muted">
        Angka ini perkiraan kebun rakyat Tapsel, bukan jaminan. Pakai untuk ngobrol dengan koperasi
        sebelum berhutang.
      </p>
      <Card className="mb-4 grid gap-3">
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
          <Label>Luas kebun (hektar)</Label>
          <Input
            className="mt-1"
            type="number"
            min={0.1}
            step={0.1}
            value={ha}
            onChange={(e) => setHa(Number(e.target.value))}
          />
        </div>
        <p className="text-xs text-fg-muted">{preset.note}</p>
      </Card>
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <p className="text-xs text-fg-muted">Biaya</p>
          <p className="font-medium tabular-nums">{formatIdr(result.cost, true)}</p>
        </Card>
        <Card>
          <p className="text-xs text-fg-muted">Panen</p>
          <p className="font-medium tabular-nums">{result.yieldKg.toLocaleString("id-ID")} kg</p>
        </Card>
        <Card>
          <p className="text-xs text-fg-muted">Omzet harga kini</p>
          <p className="font-medium tabular-nums">{formatIdr(result.revenue, true)}</p>
        </Card>
        <Card>
          <p className="text-xs text-fg-muted">Perkiraan untung</p>
          <p className={result.profit >= 0 ? "font-medium tabular-nums text-leaf" : "font-medium tabular-nums text-ulos"}>
            {formatIdr(result.profit, true)}
          </p>
        </Card>
      </div>
      <p className="mt-3 text-sm text-fg-muted">
        Setara {formatIdr(result.perMonth)} per bulan selama {preset.months} bulan. Harga pakai pasar
        hari ini {formatIdr(c.priceIdr)} / kg.
      </p>
    </Page>
  );
}
