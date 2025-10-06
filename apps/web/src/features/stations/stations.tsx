import { useState, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { stationsQueryOptions } from "./api/getStations";
import StationCard from "./components/stationCard";
import TagFilter from "./components/tagFilter";
import SortControls from "./components/sortControls";
import getStationTags from "./utils/getStationTags";
import getFilteredAndSortedStations from "./utils/getFilteredAndSortedStations";
import SortOption from "./types/sortOption";
import SortKey from "./types/sortKey";

const sortOptions: SortOption[] = [
  { key: SortKey.Default, label: "Default" },
  { key: SortKey.Popularity, label: "Popularity" },
  { key: SortKey.Reliability, label: "Reliability" },
];

const Stations = () => {
  // For simplicity, selected tag and sorting option are using local state.
  // In a production app, persisting this state in URL query parameters can be beneficial.
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>(SortKey.Default);
  const { data: stations } = useSuspenseQuery(stationsQueryOptions);

  const allTags = useMemo(() => {
    return getStationTags(stations);
  }, [stations]);

  const filteredAndSortedStations = useMemo(() => {
    return getFilteredAndSortedStations(stations, selectedTag, sortBy);
  }, [stations, selectedTag, sortBy]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h1 className="text-4xl font-extrabold text-white">Stations</h1>
        <SortControls
          sortOptions={sortOptions}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>
      <TagFilter
        tags={allTags}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
      />
      {filteredAndSortedStations.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredAndSortedStations.map((station) => (
            <Link
              key={station.id}
              to="/stations/$stationId"
              params={{
                stationId: station.id,
              }}
            >
              <StationCard station={station} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400">
            No stations found for the selected options.
          </p>
        </div>
      )}
    </div>
  );
};
export default Stations;
