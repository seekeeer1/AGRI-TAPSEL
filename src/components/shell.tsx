import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  CloudSun,
  Coins,
  Calculator,
  Home,
  Landmark,
  Menu,
  ScrollText,
  Store,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { APP_NAME } from "@/lib/data";
import { initials } from "@/lib/format";
import { useApp, useMe } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const TABS = [
  { to: "/", label: "Beranda", icon: Home },
  { to: "/token", label: "Token", icon: Coins },
  { to: "/pasar", label: "Pasar", icon: Store },
  { to: "/komunitas", label: "Komunitas", icon: Users },
] as const;

const MORE = [
  { to: "/dana", label: "Pendanaan", icon: Landmark },
  { to: "/gotong", label: "Gotong royong", icon: Users },
  { to: "/belajar", label: "Belajar", icon: BookOpen },
  { to: "/cuaca", label: "Cuaca", icon: CloudSun },
  { to: "/hitung", label: "Hitung tanam", icon: Calculator },
  { to: "/dompet", label: "Dompet", icon: Wallet },
  { to: "/konsep", label: "Visi & peta jalan", icon: ScrollText },
];


function HydrateSkeleton() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto flex min-h-dvh max-w-6xl">
        {/* Desktop sidebar skeleton */}
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-forest px-3 py-5 md:flex">
          <div className="mb-8 h-8 w-32 animate-pulse rounded-lg bg-primary-foreground/20" />
          <div className="flex flex-1 flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded-xl bg-primary-foreground/10" />
            ))}
            <div className="mt-5 mb-1 h-3 w-16 animate-pulse rounded bg-primary-foreground/15" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded-xl bg-primary-foreground/10" />
            ))}
          </div>
          <div className="mt-auto flex items-center gap-3 pt-4">
            <div className="size-9 animate-pulse rounded-full bg-primary-foreground/20" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 w-24 animate-pulse rounded bg-primary-foreground/20" />
              <div className="h-3 w-16 animate-pulse rounded bg-primary-foreground/15" />
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile header skeleton */}
          <header className="sticky top-0 z-30 border-b border-border bg-bg/90 md:hidden">
            <div className="ulos-strip h-1 w-full" />
            <div className="flex h-14 items-center justify-between px-4">
              <div className="h-6 w-28 animate-pulse rounded-md bg-bg-sunken" />
              <div className="flex items-center gap-2">
                <div className="size-8 animate-pulse rounded-full bg-bg-sunken" />
                <div className="size-10 animate-pulse rounded-lg bg-bg-sunken" />
              </div>
            </div>
          </header>

          {/* Content skeleton */}
          <main className="flex-1 px-4 pt-5 pb-24 md:px-8 md:pt-8 md:pb-10">
            <div className="mx-auto max-w-2xl space-y-4">
              {/* Hero card */}
              <div className="h-44 animate-pulse rounded-2xl bg-forest/20" />
              {/* Stats row */}
              <div className="grid grid-cols-2 gap-2">
                <div className="h-20 animate-pulse rounded-2xl bg-bg-sunken" />
                <div className="h-20 animate-pulse rounded-2xl bg-bg-sunken" />
              </div>
              {/* List cards */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-3 rounded-2xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-bg-sunken" />
                  <div className="h-3 w-full animate-pulse rounded bg-bg-sunken" />
                  <div className="h-3 w-4/5 animate-pulse rounded bg-bg-sunken" />
                  <div className="mt-2 h-2 w-full animate-pulse rounded-full bg-bg-sunken" />
                </div>
              ))}
            </div>
          </main>

          {/* Mobile bottom nav skeleton */}
          <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg-elevated/95 md:hidden">
            <div className="mx-auto grid max-w-lg grid-cols-5 px-1 pt-2 pb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="size-6 animate-pulse rounded-md bg-bg-sunken" />
                  <div className="h-2.5 w-10 animate-pulse rounded bg-bg-sunken" />
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const me = useMe();
  const hasOnboarded = useApp((s) => s.hasOnboarded);
  const [more, setMore] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const done = () => setHydrated(true);
    if (useApp.persist.hasHydrated()) done();
    return useApp.persist.onFinishHydration(done);
  }, []);

  if (!hydrated) {
    return <HydrateSkeleton />;
  }

  if (!hasOnboarded || pathname === "/mulai") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto flex min-h-dvh max-w-6xl">
        <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-forest px-3 py-5 text-primary-foreground md:flex">
          <Brand light />
          <nav className="mt-8 flex flex-1 flex-col gap-1">
            {TABS.map((t) => (
              <SideLink
                key={t.to}
                {...t}
                active={t.to === "/" ? pathname === "/" : pathname === t.to || pathname.startsWith(`${t.to}/`)}
                light
              />
            ))}
            <p className="mt-5 mb-1 px-3 text-xs font-medium uppercase tracking-wider text-primary-foreground/50">
              Lainnya
            </p>
            {MORE.map((t) => (
              <SideLink key={t.to} {...t} active={pathname === t.to || pathname.startsWith(`${t.to}/`)} light />
            ))}
          </nav>
          <Link
            to="/profil"
            className="mt-auto flex items-center gap-3 rounded-xl bg-forest-deep px-3 py-3"
          >
            <Avatar name={me.name} />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{me.name}</span>
              <span className="block truncate text-xs text-primary-foreground/60">{me.title}</span>
            </span>
          </Link>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-md md:hidden">
            <div className="ulos-strip h-1 w-full" />
            <div className="flex h-14 items-center justify-between px-4">
              <Brand />
              <div className="flex items-center gap-1">
                <Link
                  to="/profil"
                  className="flex size-10 items-center justify-center"
                  aria-label="Profil"
                >
                  <Avatar name={me.name} small />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10"
                  aria-label={more ? "Tutup menu" : "Menu"}
                  onClick={() => setMore((v) => !v)}
                >
                  {more ? <X /> : <Menu />}
                </Button>
              </div>
            </div>
          </header>

          {more ? (
            <div className="border-b border-border bg-bg-elevated px-4 py-3 md:hidden">
              <div className="grid grid-cols-2 gap-2">
                {MORE.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMore(false)}
                    className="flex h-12 items-center gap-2 rounded-xl bg-bg px-3 text-sm font-medium text-fg shadow-[var(--shadow-border)]"
                  >
                    <item.icon className="size-4 text-leaf" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <main className="flex-1 pb-24 md:pb-10">{children}</main>

          <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg-elevated/95 backdrop-blur-md md:hidden">
            <div className="mx-auto grid max-w-lg grid-cols-5 px-1 pt-1 pb-2">
              {TABS.map((t) => {
                const active =
                  t.to === "/" ? pathname === "/" : pathname === t.to || pathname.startsWith(`${t.to}/`);
                return (
                  <Link
                    key={t.to}
                    to={t.to}
                    className={cn(
                      "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-medium",
                      active ? "text-leaf" : "text-fg-subtle",
                    )}
                  >
                    <t.icon className="size-5" strokeWidth={active ? 2.4 : 1.8} />
                    {t.label}
                  </Link>
                );
              })}
              <Link
                to="/dompet"
                className={cn(
                  "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-medium",
                  pathname === "/dompet" ? "text-leaf" : "text-fg-subtle",
                )}
              >
                <Wallet className="size-5" strokeWidth={pathname === "/dompet" ? 2.4 : 1.8} />
                Dompet
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-md",
          light ? "bg-leaf" : "bg-forest",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-5 text-primary-foreground" aria-hidden>
          <path
            fill="currentColor"
            d="M12 3c.4 2.8-1.2 5.2-3.6 6.4 2.6.2 4.8 1.6 6 3.8 1.4-2.4 3.8-3.8 6.6-3.8-2.8 3.4-2.6 8-1 11.6-2.6-1.4-5.6-1.6-8-1.2-2.4-.4-5.4-.2-8 1.2 1.6-3.6 1.8-8.2-1-11.6 2.8 0 5.2 1.4 6.6 3.8 1-1.8 2.6-3.2 4.4-3.8C11.4 7.4 11.2 5.2 12 3Z"
          />
        </svg>
      </span>
      <span>
        <span className={cn("block font-display text-sm font-semibold leading-none tracking-tight", light ? "text-primary-foreground" : "text-fg")}>
          {APP_NAME}
        </span>
        <span className={cn("block text-xs tracking-wide", light ? "text-primary-foreground/60" : "text-fg-subtle")}>
          Tapanuli Selatan
        </span>
      </span>
    </Link>
  );
}

function SideLink({
  to,
  label,
  icon: Icon,
  active,
  light,
}: {
  to: string;
  label: string;
  icon: typeof Home;
  active: boolean;
  light?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex h-10 items-center gap-2.5 rounded-lg px-3 text-sm font-medium",
        light
          ? active
            ? "bg-leaf text-primary-foreground"
            : "text-primary-foreground/75 hover:bg-forest-deep"
          : active
            ? "bg-leaf/15 text-leaf"
            : "text-fg-muted hover:bg-bg-sunken",
      )}
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}

function Avatar({ name, small }: { name: string; small?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-ulos font-medium text-accent-foreground",
        small ? "size-8 text-xs" : "size-9 text-xs",
      )}
    >
      {initials(name)}
    </span>
  );
}

export function Page({
  title,
  kicker,
  action,
  children,
  wide,
}: {
  title?: string;
  kicker?: string;
  action?: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={cn("mx-auto px-4 pt-5 md:px-8 md:pt-8", wide ? "max-w-5xl" : "max-w-2xl")}>
      {title ? (
        <header className="mb-5 flex items-start justify-between gap-3">
          <div>
            {kicker ? (
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-ulos">{kicker}</p>
            ) : null}
            <h1 className="font-display text-2xl font-semibold text-fg md:text-3xl">{title}</h1>
          </div>
          {action}
        </header>
      ) : null}
      {children}
    </div>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Meter({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 overflow-hidden rounded-full bg-bg-sunken">
      <div
        className="h-full rounded-full bg-leaf transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
