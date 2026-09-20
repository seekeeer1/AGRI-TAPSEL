import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/token")({
  component: lazyRouteComponent(() => import("./token.page")),
  pendingComponent: RoutePending,
});
