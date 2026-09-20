import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Landmark, Sprout, University, WalletCards } from "lucide-react";
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import type { Role } from "@/lib/types";
import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/mulai")({ component: Mulai });

const ROLES: { id: Role; title: string; desc: string; icon: typeof Sprout }[] = [
  {
    id: "petani",
    title: "Petani",
    desc: "Catat panen, jual langsung, ikut gotong royong.",
    icon: Sprout,
  },
  {
    id: "investor",
    title: "Investor / diaspora",
    desc: "Beli token panen, danai kebun kampung halaman.",
    icon: WalletCards,
  },
  {
    id: "koperasi",
    title: "Koperasi",
    desc: "Jaga gudang, timbang, terbitkan token anggota.",
    icon: Landmark,
  },
  {
    id: "pemerintah",
    title: "Penyuluh / Pemda",
    desc: "Pantau desa percontohan dan modul belajar.",
    icon: University,
  },
];

function Mulai() {
  const complete = useApp((s) => s.completeOnboarding);
  const nav = useNavigate();

  function pick(role: Role) {
    complete(role);
    nav({ to: "/" });
  }

  return (
    <div className="min-h-dvh bg-forest text-primary-foreground">
      <div className="ulos-strip h-1.5 w-full" />
      <div className="mx-auto grid min-h-[calc(100dvh-6px)] max-w-5xl items-center gap-8 px-5 py-10 md:grid-cols-2 md:px-8">
        <div>
          <img
            src="/images/hero-tapsel.jpg"
            alt="Pegunungan dan sawah Tapanuli Selatan"
            className="h-48 w-full rounded-2xl object-cover md:h-[28rem]"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-leaf-soft">
            Kabupaten Tapanuli Selatan
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {APP_NAME}
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/75">
            {APP_TAGLINE}. Horas. Aplikasi percontohan untuk petani rakyat Angkola dan Mandailing —
            panen jadi aset, harga terbuka, patungan tetap adat.
          </p>

          <p className="mt-8 text-sm font-medium">Masuk sebagai</p>
          <div className="mt-3 flex flex-col gap-2">
            {ROLES.map((r) => (
              <button
                key={r.id}
                onClick={() => pick(r.id)}
                className="flex items-center gap-3 rounded-2xl bg-forest-deep p-3.5 text-left transition-colors duration-150 hover:bg-leaf"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-leaf/30">
                  <r.icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{r.title}</span>
                  <span className="block text-sm text-primary-foreground/65">{r.desc}</span>
                </span>
                <ArrowRight className="size-4 opacity-60" />
              </button>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-primary-foreground/50">
            Mode percontohan. Bukan transaksi uang sungguhan.
          </p>
          <Button
            variant="ghost"
            className="mt-1 w-full text-primary-foreground/70 hover:bg-forest-deep hover:text-primary-foreground"
            onClick={() => pick("petani")}
          >
            Lewati, lihat sebagai petani
          </Button>
        </div>
      </div>
    </div>
  );
}
