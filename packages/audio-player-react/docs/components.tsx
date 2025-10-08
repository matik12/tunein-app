import { UseAudioPlayerReturn } from "../src/hooks/useAudioPlayer";

export interface AudioPlayerControlsProps {
  player: UseAudioPlayerReturn;
  className?: string;
}

export const AudioPlayerControls = ({
  player,
  className = "",
}: AudioPlayerControlsProps) => {
  const handlePlayPause = () => {
    if (player.isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <div className={`audio-player-controls ${className}`}>
      <button
        onClick={handlePlayPause}
        disabled={player.isLoading}
        aria-label={player.isPlaying ? "Pause" : "Play"}
      >
        {player.isPlaying ? "⏸" : "▶"}
      </button>
      <button
        onClick={player.stop}
        disabled={player.state === "idle" || player.state === "stopped"}
        aria-label="Stop"
      >
        ⏹
      </button>
    </div>
  );
};

// components/VolumeControl.tsx
export interface VolumeControlProps {
  player: UseAudioPlayerReturn;
  className?: string;
}

export const VolumeControl = ({
  player,
  className = "",
}: VolumeControlProps) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    player.setVolume(parseFloat(e.target.value));
  };

  return (
    <div className={`volume-control ${className}`}>
      <label htmlFor="volume">🔊</label>
      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={player.volume}
        onChange={handleVolumeChange}
        aria-label="Volume"
      />
      <span>{Math.round(player.volume * 100)}%</span>
    </div>
  );
};

// components/PlaybackState.tsx
export interface PlaybackStateProps {
  player: UseAudioPlayerReturn;
  className?: string;
}

export const PlaybackStateIndicator = ({
  player,
  className = "",
}: PlaybackStateProps) => {
  const getStateText = () => {
    switch (player.state) {
      case "playing":
        return "Playing";
      case "paused":
        return "Paused";
      case "loading":
        return "Loading...";
      case "stopped":
        return "Stopped";
      case "error":
        return `Error: ${player.error}`;
      default:
        return "Idle";
    }
  };

  return (
    <div className={`playback-state ${className}`}>
      <span className={`state-indicator state-${player.state}`}>
        {getStateText()}
      </span>
    </div>
  );
};

// components/AudioPlayer.tsx
export interface AudioPlayerComponentProps {
  player: UseAudioPlayerReturn;
  showVolume?: boolean;
  showState?: boolean;
  className?: string;
}

export const AudioPlayerComponent = ({
  player,
  showVolume = true,
  showState = true,
  className = "",
}: AudioPlayerComponentProps) => {
  return (
    <div className={`audio-player ${className}`}>
      <AudioPlayerControls player={player} />
      {showVolume && <VolumeControl player={player} />}
      {showState && <PlaybackStateIndicator player={player} />}
    </div>
  );
};
