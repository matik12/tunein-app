import { createFileRoute } from "@tanstack/react-router";
import { stationQueryOptions } from "@/features/stations/api/getStation";
import Station from "@/features/stations/station";
import SpinnerLayout from "@/components/layout/spinnerLayout";
import ErrorLayout from "@/components/layout/errors/errorLayout";

export const Route = createFileRoute("/stations/$stationId")({
  loader: ({ context: { queryClient }, params: { stationId } }) => {
    return queryClient.ensureQueryData(stationQueryOptions(stationId));
  },
  component: Station,
  pendingComponent: SpinnerLayout,
  errorComponent: ErrorLayout,
});
