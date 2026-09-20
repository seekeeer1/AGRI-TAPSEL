import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Card, Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { LESSONS } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function BelajarPage() {
  const done = useApp((s) => s.completedLessons);

  return (
    <Page kicker="Penyuluh Dinas Pertanian" title="Belajar bertani & uang">
      <p className="mb-4 text-sm text-fg-muted">
        Bahasa sederhana. Ada istilah Angkola/Mandailing. Disusun bersama penyuluh Tapsel.
      </p>
      <ul className="space-y-3">
        {LESSONS.map((l) => {
          const ok = done.includes(l.slug);
          return (
            <li key={l.slug}>
              <Link to="/belajar/$slug" params={{ slug: l.slug }} className="block">
                <Card className="flex items-start gap-3">
                  <span
                    className={
                      ok
                        ? "flex size-9 items-center justify-center rounded-full bg-leaf text-primary-foreground"
                        : "flex size-9 items-center justify-center rounded-full bg-bg-sunken text-fg-muted"
                    }
                  >
                    {ok ? <Check className="size-4" /> : <span className="text-xs">{l.minutes}m</span>}
                  </span>
                  <div>
                    <p className="font-medium">{l.title}</p>
                    <p className="text-sm text-fg-muted">{l.summary}</p>
                    <Badge className="mt-2">{l.category}</Badge>
                  </div>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
