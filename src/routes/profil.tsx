import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/profil")({
  component: lazyRouteComponent(() => import("./profil.page")),
  pendingComponent: RoutePending,
});
