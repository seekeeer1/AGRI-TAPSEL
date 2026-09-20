import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/gotong")({
  component: lazyRouteComponent(() => import("./gotong.page")),
  pendingComponent: RoutePending,
});
