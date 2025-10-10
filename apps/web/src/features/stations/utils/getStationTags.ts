import { Station } from '@/types/api/station';

const getStationTags = (stations: Station[]): string[] => {
  if (!stations.length) {
    return [];
  }

  const allTags = stations.map((station) => station.tags).flat();
  const tagsSet = new Set<string>(allTags);

  return Array.from(tagsSet).sort();
};

export default getStationTags;
