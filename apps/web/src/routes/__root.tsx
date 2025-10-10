import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';

import NotFoundLayout from '@/components/layout/errors/notFoundLayout';
import RootLayout from '@/components/layout/rootLayout';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
  notFoundComponent: NotFoundLayout
});
