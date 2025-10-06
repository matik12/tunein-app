import { createRootRouteWithContext } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import RootLayout from "@/components/layout/rootLayout";
import NotFoundLayout from "@/components/layout/errors/notFoundLayout";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
  notFoundComponent: NotFoundLayout,
});
