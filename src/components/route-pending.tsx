/** Shared pending UI while a lazy route chunk loads. */
export function RoutePending() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse space-y-4 px-4 pt-5 md:px-8 md:pt-8">
      <div className="space-y-2">
        <div className="h-3 w-24 rounded bg-bg-sunken" />
        <div className="h-8 w-2/3 rounded-lg bg-bg-sunken" />
      </div>
      <div className="h-40 rounded-2xl bg-forest/15" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-20 rounded-2xl bg-bg-sunken" />
        <div className="h-20 rounded-2xl bg-bg-sunken" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="space-y-3 rounded-2xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]"
        >
          <div className="h-4 w-3/5 rounded bg-bg-sunken" />
          <div className="h-3 w-full rounded bg-bg-sunken" />
          <div className="h-3 w-4/5 rounded bg-bg-sunken" />
          <div className="h-2 w-full rounded-full bg-bg-sunken" />
        </div>
      ))}
    </div>
  );
}
