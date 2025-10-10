import { queryOptions } from '@tanstack/react-query';

import { Station } from '@/types/api/station';

import { STATION_API_URL } from './stationApi';

type StationsResponse = {
  data: Station[];
};

type GetStationParams = {
  signal: AbortSignal;
  stationId: string;
};

export const stationQueryOptions = (stationId: string) =>
  queryOptions({
    queryKey: ['stations', { stationId }],
    queryFn: ({ signal }) => getStation({ signal, stationId })
  });

// Usually in production use cases, there is a dedicated endpoint to fetch a single station by ID.
// However, for this sample implementation, the same endpoint is used to fetch all stations and then filter by Id.
export const getStation = async ({ signal, stationId }: GetStationParams) => {
  try {
    const response = await fetch(STATION_API_URL, { signal });

    if (!response.ok) {
      throw new Error(`Failed to load station. Status code: ${response.status}`);
    }

    const responseData: StationsResponse = await response.json();
    const station = responseData.data.find((s) => s.id === stationId);

    if (!station) {
      throw new Error(`Station with Id=${stationId} not found.`);
    }

    return station;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
