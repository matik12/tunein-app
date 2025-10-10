import { queryOptions } from '@tanstack/react-query';

import { Station } from '@/types/api/station';

import { STATION_API_URL } from './stationApi';

type StationsResponse = {
  data: Station[];
};

export const stationsQueryOptions = queryOptions({
  queryKey: ['stations'],
  queryFn: ({ signal }) => getStations({ signal })
});

export const getStations = async ({ signal }: { signal: AbortSignal }) => {
  try {
    const response = await fetch(STATION_API_URL, { signal });

    if (!response.ok) {
      throw new Error(`Failed to load stations. Status code: ${response.status}`);
    }

    const responseData: StationsResponse = await response.json();
    return responseData.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
