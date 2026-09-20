import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "muted",
  children,
}: {
  className?: string;
  tone?: "muted" | "leaf" | "ulos" | "forest" | "warn";
  children: ReactNode;
}) {
  const tones = {
    muted: "bg-bg-sunken text-fg-muted",
    leaf: "bg-leaf/15 text-leaf",
    ulos: "bg-ulos/15 text-ulos",
    forest: "bg-forest text-primary-foreground",
    warn: "bg-warn/15 text-warn",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
