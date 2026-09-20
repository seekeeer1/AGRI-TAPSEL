import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/dana/$id")({
  component: lazyRouteComponent(() => import("./dana.$id.page")),
  pendingComponent: RoutePending,
});
