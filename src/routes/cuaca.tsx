import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/cuaca")({
  component: lazyRouteComponent(() => import("./cuaca.page")),
  pendingComponent: RoutePending,
});
