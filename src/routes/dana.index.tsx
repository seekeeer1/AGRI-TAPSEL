import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/dana/")({
  component: lazyRouteComponent(() => import("./dana.index.page")),
  pendingComponent: RoutePending,
});
