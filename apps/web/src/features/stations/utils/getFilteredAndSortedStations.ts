import { Station } from "@/types/api/station";
import SortKey from "../types/sortKey";

const getFilteredAndSortedStations = (
  stations: Station[],
  tag: string | null,
  sortBy: string,
) => {
  let result = stations;

  if (tag) {
    result = result.filter((station) => station.tags.includes(tag));
  }

  switch (sortBy) {
    case SortKey.Popularity:
      result = [...result].sort(
        (a, b) => (b.popularity ?? -1) - (a.popularity ?? -1),
      );
      break;
    case SortKey.Reliability:
      result = [...result].sort((a, b) => b.reliability - a.reliability);
      break;
    default:
      break;
  }
  return result;
};

export default getFilteredAndSortedStations;
