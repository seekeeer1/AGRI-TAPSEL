import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/pasar/")({
  component: lazyRouteComponent(() => import("./pasar.index.page")),
  pendingComponent: RoutePending,
});
