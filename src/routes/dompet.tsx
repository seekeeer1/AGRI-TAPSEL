import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/dompet")({
  component: lazyRouteComponent(() => import("./dompet.page")),
  pendingComponent: RoutePending,
});
