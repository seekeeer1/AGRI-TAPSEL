import { toast } from "sonner";
import { Card, Meter, Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatIdr } from "@/lib/format";
import { useApp } from "@/lib/store";

export default function GotongPage() {
  const pools = useApp((s) => s.pools);
  const join = useApp((s) => s.joinPool);
  const wallet = useApp((s) => s.walletIdr);

  return (
    <Page kicker="Marharoan" title="Gotong royong digital">
      <p className="mb-4 text-sm text-fg-muted">
        Patungan pupuk, alat, atau modal tanam. Tanpa bunga. Catatan iuran kelihatan semua anggota.
        Ini adat yang rapi, bukan rentenir.
      </p>
      <p className="mb-4 text-xs text-fg-muted">Saldo dompet {formatIdr(wallet)}</p>
      <ul className="space-y-3">
        {pools.map((p) => {
          const pct = (p.raisedIdr / p.targetIdr) * 100;
          return (
            <li key={p.id}>
              <Card>
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-medium">{p.title}</h2>
                  {p.joined ? <Badge tone="leaf">Anda ikut</Badge> : null}
                </div>
                <p className="mt-1 text-sm text-fg-muted">{p.purpose}</p>
                <p className="mt-1 text-xs text-fg-subtle">
                  {p.village} · {p.members} anggota · batas {formatDate(p.due)}
                </p>
                <div className="mt-3">
                  <Meter value={pct} />
                  <p className="mt-1 text-xs tabular-nums text-fg-muted">
                    {formatIdr(p.raisedIdr)} / {formatIdr(p.targetIdr)}
                  </p>
                </div>
                <Button
                  className="mt-3"
                  size="sm"
                  variant={p.joined ? "outline" : "default"}
                  onClick={() => {
                    if (wallet < 150000) {
                      toast.error("Saldo tidak cukup untuk iuran Rp 150.000.");
                      return;
                    }
                    const ok = join(p.id, 150000);
                    if (ok) toast.success("Iuran Rp 150.000 tercatat.");
                    else toast.error("Gagal mencatat iuran. Coba lagi.");
                  }}
                >
                  Setor iuran Rp 150.000
                </Button>
              </Card>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
