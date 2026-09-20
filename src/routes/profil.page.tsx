import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Card, Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PEOPLE } from "@/lib/data";
import { initials } from "@/lib/format";
import { useApp, useMe } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function ProfilPage() {
  const me = useMe();
  const setRole = useApp((s) => s.setRole);
  const reset = useApp((s) => s.resetDemo);
  const tokens = useApp((s) => s.tokens.length);
  const lessons = useApp((s) => s.completedLessons.length);

  return (
    <Page kicker="Identitas petani" title="Profil">
      <Card className="mb-4 flex gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-ulos text-lg font-medium text-accent-foreground">
          {initials(me.name)}
        </span>
        <div>
          <p className="font-display text-xl font-semibold">{me.name}</p>
          <p className="text-sm text-fg-muted">{me.title}</p>
          <p className="text-xs text-fg-subtle">
            {me.village}, {me.kecamatan}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge tone="leaf">NIK terverifikasi (demo)</Badge>
            <Badge>Lahan terdaftar</Badge>
          </div>
        </div>
      </Card>
      <p className="mb-3 text-sm text-fg-muted">{me.bio}</p>
      <div className="mb-5 grid grid-cols-2 gap-2">
        <Card>
          <p className="text-xs text-fg-muted">Token panen</p>
          <p className="text-lg font-medium tabular-nums">{tokens}</p>
        </Card>
        <Card>
          <p className="text-xs text-fg-muted">Modul selesai</p>
          <p className="text-lg font-medium tabular-nums">{lessons}</p>
        </Card>
      </div>

      <h2 className="mb-2 font-display text-lg font-semibold">Ganti peran demo</h2>
      <div className="grid grid-cols-2 gap-2">
        {PEOPLE.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setRole(p.role);
              toast.success(`Peran diganti ke ${p.title}`);
            }}
            className={cn(
              "rounded-2xl p-3 text-left shadow-[var(--shadow-border)]",
              me.role === p.role ? "bg-forest text-primary-foreground" : "bg-bg-elevated text-fg",
            )}
          >
            <p className="text-sm font-medium">{p.name}</p>
            <p className={cn("text-xs", me.role === p.role ? "text-primary-foreground/70" : "text-fg-muted")}>
              {p.title}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Link to="/konsep" className="text-sm font-medium text-leaf">
          Baca visi, model bisnis, dan peta jalan
        </Link>
        <Button
          variant="outline"
          onClick={() => {
            reset();
            toast.success("Data percontohan direset. Peran tetap sama.");
          }}
        >
          Reset data percontohan
        </Button>
      </div>
    </Page>
  );
}
