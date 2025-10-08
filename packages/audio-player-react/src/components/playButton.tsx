import Spinner from "./spinner";
import PlayIcon from "./icons/playIcon";
import PauseIcon from "./icons/pauseIcon";
import RetryIcon from "./icons/retryIcon";

type PlayButtonProps = {
  isPlaying: boolean;
  isLoading: boolean;
  isError: boolean;
  onTogglePlay: () => void;
  className?: string;
};

const PlayButton = ({
  isPlaying,
  isLoading,
  isError,
  onTogglePlay,
  className = "",
}: PlayButtonProps) => {
  return (
    <button
      onClick={onTogglePlay}
      aria-label={isError ? "Retry" : isPlaying ? "Pause" : "Play"}
      className={`flex items-center justify-center w-14 h-14 text-white rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer ${className} ${isError ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
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
  );
};

export default PlayButton;
