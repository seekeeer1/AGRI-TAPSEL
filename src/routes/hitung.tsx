import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/hitung")({
  component: lazyRouteComponent(() => import("./hitung.page")),
  pendingComponent: RoutePending,
});
