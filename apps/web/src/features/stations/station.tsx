import { useEffect, useCallback } from "react";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useStationAudioPlayer } from "@/context/stationAudioPlayerContext";
import PlayButton from "@/components/ui/playButton";
import { stationQueryOptions } from "./api/getStation";

const route = getRouteApi("/stations/$stationId");

const Station = () => {
  const stationId = route.useParams().stationId;
  const { data: station } = useSuspenseQuery(stationQueryOptions(stationId));
  const router = useRouter();
  const { isPlaying, isLoading, currentStation, playStation, togglePlay } =
    useStationAudioPlayer();

  useEffect(() => {
    // Auto-play station when browsing station details.
    // Only if it's not already playing/loading a station.
    if (isPlaying || isLoading) {
      return;
    }

    if (!currentStation) {
      playStation(station);
    }
  }, [isPlaying, isLoading, currentStation, playStation, station]);

  const isStationActive = currentStation?.id === station.id;
  const isStationPlaying = isStationActive && isPlaying;

  const handlePlayClick = useCallback(() => {
    if (isStationActive) {
      togglePlay();
    } else {
      playStation(station);
    }

    // Analytics tracking (replace with proper analytics logic)
    console.log(
      `User clicked ${isStationPlaying ? "pause" : "play"} on ${
        station.name
      } from source: Station Details Page`,
    );
  }, [isStationActive, isStationPlaying, station, togglePlay, playStation]);

  return (
    <div>
      <button
        onClick={() => router.history.back()}
        className="text-blue-400 hover:text-blue-300 mb-8 cursor-pointer"
      >
        &larr; Back to Stations
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex-shrink-0">
          <img
            src={station.imgUrl}
            alt={`${station.name} details`}
            className="w-full h-auto rounded-lg shadow-2xl object-cover"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-2">
            {station.name}
          </h1>
          <p className="text-lg text-gray-300 mb-6">{station.description}</p>

          <div className="space-y-4 my-8">
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Popularity
                </h4>
                <span className="text-sm font-bold text-yellow-400">
                  {station.popularity ?? "-"} / 5
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{ width: `${((station.popularity ?? 0) * 100) / 5}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Reliability
                </h4>
                <span className="text-sm font-bold text-green-400">
                  {station.reliability} / 100
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${station.reliability}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-8">
            <PlayButton
              className="w-16 h-16"
              isActive={isStationActive}
              isPlaying={isStationPlaying}
              isLoading={isLoading}
              onPlayClick={handlePlayClick}
            />
            <p className="text-gray-400">Play this station</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {station.tags.map((tag) => (
              <span
                key={tag}
                className="bg-slate-700 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Station;
