import { createRouter } from "@tanstack/react-router";
import { RoutePending } from "@/components/route-pending";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultPendingComponent: RoutePending,
    defaultPreload: "intent",
    defaultPendingMs: 150,
    defaultPendingMinMs: 250,
  });
}
