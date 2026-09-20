import { Link } from "@tanstack/react-router";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, Page } from "@/components/shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BADGES } from "@/lib/data";
import { formatDateTime, initials } from "@/lib/format";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

const TOPICS = ["Semua", "Kopi", "Kakao", "Gotong royong", "Edukasi"];

export default function KomunitasPage() {
  const posts = useApp((s) => s.posts);
  const like = useApp((s) => s.likePost);
  const add = useApp((s) => s.addPost);
  const [topic, setTopic] = useState("Semua");
  const [body, setBody] = useState("");
  const shown = topic === "Semua" ? posts : posts.filter((p) => p.topic === topic);

  return (
    <Page kicker="Dongan sabutuha" title="Komunitas Tapsel">
      <div className="mb-4 flex gap-2 overflow-x-auto">
        <Link
          to="/gotong"
          className="h-9 shrink-0 rounded-full bg-ulos px-3.5 text-sm font-medium leading-9 text-accent-foreground"
        >
          Gotong royong
        </Link>
        {TOPICS.map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            className={cn(
              "h-9 shrink-0 rounded-full px-3.5 text-sm",
              topic === t ? "bg-forest text-primary-foreground" : "bg-bg-elevated text-fg-muted shadow-[var(--shadow-border)]",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <Card className="mb-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder="Tulis kabar kebun, minta bantuan, atau undang patungan…"
          className="w-full resize-none rounded-lg bg-bg p-3 text-sm shadow-[var(--shadow-border)] placeholder:text-fg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button
          className="mt-2"
          size="sm"
          disabled={!body.trim()}
          onClick={() => {
            add(body.trim(), topic === "Semua" ? "Umum" : topic);
            setBody("");
            toast.success("Kabar terkirim ke desa.");
          }}
        >
          Kirim
        </Button>
      </Card>

      <div className="mb-4 flex gap-2 overflow-x-auto">
        {BADGES.map((b) => (
          <div key={b.id} className="min-w-36 rounded-2xl bg-bg-elevated p-3 shadow-[var(--shadow-border)]">
            <p className="text-sm font-medium">{b.name}</p>
            <p className="text-xs text-fg-muted">{b.desc}</p>
          </div>
        ))}
      </div>

      <ul className="space-y-3">
        {shown.map((p) => (
          <li key={p.id}>
            <Card>
              <div className="flex gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-medium text-primary-foreground">
                  {initials(p.author)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{p.author}</p>
                  <p className="text-xs text-fg-muted">
                    {p.roleLabel} · {p.village}, {p.kecamatan} · {formatDateTime(p.createdAt)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">{p.body}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <button
                      className={cn("flex items-center gap-1 text-sm", p.liked ? "text-ulos" : "text-fg-muted")}
                      onClick={() => like(p.id)}
                    >
                      <Heart className="size-4" fill={p.liked ? "currentColor" : "none"} />
                      {p.likes}
                    </button>
                    <span className="flex items-center gap-1 text-sm text-fg-muted">
                      <MessageCircle className="size-4" />
                      {p.comments}
                    </span>
                    <Badge>{p.topic}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Page>
  );
}
