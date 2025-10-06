import { createFileRoute } from "@tanstack/react-router";
import { stationsQueryOptions } from "@/features/stations/api/getStations";
import Stations from "@/features/stations/stations";
import SpinnerLayout from "@/components/layout/spinnerLayout";
import ErrorLayout from "@/components/layout/errors/errorLayout";

export const Route = createFileRoute("/stations/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(stationsQueryOptions),
  component: Stations,
  pendingComponent: SpinnerLayout,
  errorComponent: ErrorLayout,
});
