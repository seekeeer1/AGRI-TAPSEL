import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";

export const Route = createFileRoute("/belajar/$slug")({
  component: lazyRouteComponent(() => import("./belajar.$slug.page")),
  pendingComponent: RoutePending,
});
