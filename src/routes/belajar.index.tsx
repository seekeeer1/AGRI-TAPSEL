import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/belajar/")({
  component: lazyRouteComponent(() => import("./belajar.index.page")),
  pendingComponent: RoutePending,
});
