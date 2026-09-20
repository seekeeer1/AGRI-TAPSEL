import { toast } from "sonner";
import { Card, Page } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { formatDateTime, formatIdr } from "@/lib/format";
import { useApp } from "@/lib/store";

export default function DompetPage() {
  const wallet = useApp((s) => s.walletIdr);
  const txs = useApp((s) => s.txs);
  const pay = useApp((s) => s.payQris);

  return (
    <Page kicker="QRIS & buku kas" title="Dompet">
      <Card className="mb-4 bg-forest text-primary-foreground">
        <p className="text-xs text-primary-foreground/60">Saldo rupiah</p>
        <p className="font-display text-3xl font-semibold tabular-nums">{formatIdr(wallet)}</p>
        <p className="mt-1 text-xs text-primary-foreground/60">
          Terhubung QRIS · e-wallet demo
        </p>
        <div className="mt-4 flex gap-2">
          <Button
            variant="muted"
            className="bg-leaf text-primary-foreground hover:bg-leaf-soft"
            onClick={() => {
              useApp.setState({ walletIdr: wallet + 1_000_000 });
              toast.success("Top up demo Rp 1.000.000.");
            }}
          >
            Isi Rp 1 jt
          </Button>
          <Button
            variant="outline"
            className="border-0 bg-forest-deep text-primary-foreground"
            onClick={() => {
              const ok = pay("Bayar pupuk via QRIS", 250000);
              toast[ok ? "success" : "error"](ok ? "QRIS pupuk berhasil." : "Saldo kurang.");
            }}
          >
            Bayar QRIS
          </Button>
        </div>
      </Card>
      <h2 className="mb-2 font-display text-lg font-semibold">Riwayat</h2>
      <ul className="space-y-2">
        {txs.map((t) => (
          <li
            key={t.id}
            className="flex items-start justify-between gap-3 rounded-xl bg-bg-elevated px-4 py-3 shadow-[var(--shadow-border)]"
          >
            <div>
              <p className="text-sm">{t.label}</p>
              <p className="text-xs text-fg-subtle">{formatDateTime(t.at)}</p>
            </div>
            <p
              className={
                t.kind === "masuk"
                  ? "text-sm font-medium tabular-nums text-leaf"
                  : "text-sm font-medium tabular-nums text-ulos"
              }
            >
              {t.kind === "masuk" ? "+" : "−"}
              {formatIdr(t.amountIdr)}
            </p>
          </li>
        ))}
      </ul>
    </Page>
  );
}
