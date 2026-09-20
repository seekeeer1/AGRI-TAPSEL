import { CloudRain, Sun, CloudSun } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, Page } from "@/components/shell";
import { WEATHER } from "@/lib/data";

export default function CuacaPage() {
  const today = WEATHER[0]!;
  return (
    <Page kicker="Sipirok · 1.200 mdpl" title="Cuaca kebun">
      <Card className="mb-4 bg-forest text-primary-foreground">
        <p className="text-sm text-primary-foreground/70">Hari ini</p>
        <p className="font-display text-4xl font-semibold tabular-nums">{today.temp}°</p>
        <p className="text-sm">
          {today.label} · {today.rainMm} mm hujan
        </p>
        <p className="mt-3 text-sm text-primary-foreground/75">
          Cocok olah washed jika ada jendela cerah 2 hari. Tunda pemupukan urea jika hujan lebih dari 15 mm.
        </p>
      </Card>
      <Card>
        <p className="mb-2 text-sm font-medium">Hujan 7 hari (mm)</p>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={WEATHER}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#5e5a53" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Bar dataKey="rainMm" fill="#2f6b4a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <ul className="mt-3 space-y-2">
        {WEATHER.map((d) => (
          <li
            key={d.day}
            className="flex items-center justify-between rounded-xl bg-bg-elevated px-4 py-3 shadow-[var(--shadow-border)]"
          >
            <span className="flex items-center gap-2 text-sm">
              {d.rainMm > 10 ? (
                <CloudRain className="size-4 text-leaf" />
              ) : d.rainMm > 0 ? (
                <CloudSun className="size-4 text-leaf" />
              ) : (
                <Sun className="size-4 text-warn" />
              )}
              {d.day}
            </span>
            <span className="text-sm tabular-nums text-fg-muted">
              {d.temp}° · {d.rainMm} mm · {d.label}
            </span>
          </li>
        ))}
      </ul>
    </Page>
  );
}
