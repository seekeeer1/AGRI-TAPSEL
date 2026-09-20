import { Link, useParams } from "@tanstack/react-router";
import { toast } from "sonner";
import { Card, Page } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { LESSONS } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function LessonPage() {
  const { slug } = useParams({ from: "/belajar/$slug" });
  const lesson = LESSONS.find((l) => l.slug === slug);
  const done = useApp((s) => s.completedLessons.includes(slug));
  const complete = useApp((s) => s.completeLesson);

  if (!lesson) {
    return (
      <Page title="Modul tidak ada">
        <Link to="/belajar" className="text-sm text-leaf">
          Kembali
        </Link>
      </Page>
    );
  }

  return (
    <Page kicker={lesson.category} title={lesson.title}>
      <p className="mb-4 text-sm text-fg-muted">{lesson.minutes} menit bacaan</p>
      <div className="space-y-3">
        {lesson.body.map((p) => (
          <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-fg">
            {p}
          </p>
        ))}
      </div>
      {lesson.terms.length ? (
        <Card className="mt-5">
          <p className="text-sm font-medium">Istilah setempat</p>
          <ul className="mt-2 space-y-1">
            {lesson.terms.map((t) => (
              <li key={t.batak} className="text-sm">
                <span className="font-medium text-ulos">{t.batak}</span>
                <span className="text-fg-muted"> — {t.arti}</span>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
      <Button
        className="mt-5 w-full"
        variant={done ? "outline" : "default"}
        onClick={() => {
          complete(lesson.slug);
          toast.success("Modul ditandai selesai. Horas.");
        }}
      >
        {done ? "Sudah selesai" : "Saya sudah baca"}
      </Button>
    </Page>
  );
}
