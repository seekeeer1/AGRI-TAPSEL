import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/pasar/$id")({
  component: lazyRouteComponent(() => import("./pasar.$id.page")),
  pendingComponent: RoutePending,
});
