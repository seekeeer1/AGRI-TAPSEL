import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/konsep")({
  component: lazyRouteComponent(() => import("./konsep.page")),
  pendingComponent: RoutePending,
});
