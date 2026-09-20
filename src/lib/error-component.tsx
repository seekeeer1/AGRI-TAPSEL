import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "Terjadi kesalahan tak terduga. Coba muat ulang halaman.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg">
      <span className="text-ulos" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="font-display text-lg font-semibold">Ada yang kurang beres</h1>
      <p className="max-w-md text-sm break-words text-fg-muted">{errorMessage(error)}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-2 rounded-lg bg-leaf px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-leaf-soft"
      >
        Muat ulang
      </button>
    </main>
  );
}
