import { Spinner } from '@tunein/audio-player-react';
import { PlayIcon, PauseIcon } from '@tunein/audio-player-react/components/icons';

type PlayButtonProps = {
  isActive: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  onPlayClick: () => void;
  className?: string;
};

const PlayButton = ({ isActive, isPlaying, isLoading, onPlayClick, className = '' }: PlayButtonProps) => {
  return (
    <button
      onClick={onPlayClick}
      aria-label={isPlaying ? 'Pause' : 'Play'}
      className={`flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-transform transform hover:scale-105 active:scale-95 disabled:bg-gray-500 cursor-pointer disabled:cursor-not-allowed ${className}`}
    >
      {isActive && isLoading ? (
        <Spinner className="w-6 h-6 border-white/80" />
      ) : isPlaying ? (
        <PauseIcon className="w-12 h-12" />
      ) : (
        <PlayIcon className="w-12 h-12" />
      )}
    </button>
  );
};

export default PlayButton;
