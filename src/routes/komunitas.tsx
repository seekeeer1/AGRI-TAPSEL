import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/komunitas")({
  component: lazyRouteComponent(() => import("./komunitas.page")),
  pendingComponent: RoutePending,
});
