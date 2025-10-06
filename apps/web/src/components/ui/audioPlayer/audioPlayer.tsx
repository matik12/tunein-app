import { useAudioPlayer } from "./audioPlayerContext";
import Container from "../container";
import Spinner from "../spinner";
import PlayIcon from "../../icons/playIcon";
import PauseIcon from "../../icons/pauseIcon";
import RetryIcon from "../../icons/retryIcon";

const AudioPlayer = () => {
  const { currentStation, isPlaying, togglePlayPause, isLoading, isError } =
    useAudioPlayer();

  // Don't render the player if no station is selected
  if (!currentStation) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm z-50 shadow-t-lg border-t border-slate-700">
      <Container>
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center space-x-4 min-w-0">
            <img
              src={currentStation.imgUrl}
              alt={`${currentStation.name} cover`}
              className="w-16 h-16 rounded-md object-cover shadow-lg flex-shrink-0"
            />
            <div className="min-w-0">
              <h3
                className={`font-bold text-lg truncate ${isError ? "text-red-400" : "text-white"}`}
              >
                {currentStation.name}
              </h3>
              {isError ? (
                <p className="text-red-400 text-sm truncate">
                  Failed to load stream. Click to retry.
                </p>
              ) : (
                <p className="text-gray-400 text-sm truncate">
                  {currentStation.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlayPause}
              aria-label={isError ? "Retry" : isPlaying ? "Pause" : "Play"}
              className={`flex items-center justify-center w-14 h-14 text-white rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer ${isError ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isError ? (
                <RetryIcon className="w-8 h-8" />
              ) : isLoading ? (
                <Spinner className="w-4 h-4" />
              ) : isPlaying ? (
                <PauseIcon className="w-10 h-10" />
              ) : (
                <PlayIcon className="w-10 h-10" />
              )}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AudioPlayer;
