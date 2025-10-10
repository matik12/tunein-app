import {
  AudioPlayer,
  PlaybackState,
  AudioSource,
  PlaybackOptions,
  PlayerEventType,
  PlayerEvent
} from '@tunein/audio-player';
import { useState, useEffect, useCallback } from 'react';

export interface UseAudioPlayerReturn {
  load: (source: AudioSource, options?: PlaybackOptions) => Promise<void>;
  play: (options?: { restart?: boolean }) => Promise<void>;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  state: PlaybackState;
  volume: number;
  currentTime: number;
  duration: number;
  error: string | null;
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  isError: boolean;
}

/**
 * React hook for managing an audio player state & actions
 */
const useAudioPlayer = (player: AudioPlayer): UseAudioPlayerReturn => {
  const [state, setState] = useState<PlaybackState>(player.getState());
  const [volume, setVolumeState] = useState<number>(player.getVolume());
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleStateChange = (event: PlayerEvent<PlayerEventType.STATE_CHANGE>) => {
      setState(event.payload.state);

      if (event.payload.state !== PlaybackState.ERROR) {
        setError(null);
      }
    };

    const handleVolumeChange = (event: PlayerEvent<PlayerEventType.VOLUME_CHANGE>) => {
      setVolumeState(event.payload.volume);
    };

    // This event handler will fire and update the state very frequently.
    // It may be useful to throttle state updates,
    // unless real-time displaying of current playback time is required.
    const handleTimeUpdate = (event: PlayerEvent<PlayerEventType.TIME_UPDATE>) => {
      setCurrentTime(event.payload.currentTime);
      setDuration(event.payload.duration);
    };

    const handleError = (event: PlayerEvent<PlayerEventType.ERROR>) => {
      setError(event.payload.message);
    };

    player.on(PlayerEventType.STATE_CHANGE, handleStateChange);
    player.on(PlayerEventType.VOLUME_CHANGE, handleVolumeChange);
    player.on(PlayerEventType.TIME_UPDATE, handleTimeUpdate);
    player.on(PlayerEventType.ERROR, handleError);

    return () => {
      player.off(PlayerEventType.STATE_CHANGE, handleStateChange);
      player.off(PlayerEventType.VOLUME_CHANGE, handleVolumeChange);
      player.off(PlayerEventType.TIME_UPDATE, handleTimeUpdate);
      player.off(PlayerEventType.ERROR, handleError);
    };
  }, [player]);

  const play = useCallback(
    async (options?: { restart?: boolean }) => {
      await player.play(options);
    },
    [player]
  );

  const pause = useCallback(() => {
    player.pause();
  }, [player]);

  const stop = useCallback(() => {
    player.stop();
  }, [player]);

  const load = useCallback(
    async (source: AudioSource, options?: PlaybackOptions) => {
      await player.load(source, options);
    },
    [player]
  );

  const setVolume = useCallback(
    (volume: number) => {
      player.setVolume(volume);
    },
    [player]
  );

  return {
    load,
    play,
    pause,
    stop,
    setVolume,
    state,
    volume,
    currentTime,
    duration,
    error,
    isPlaying: state === PlaybackState.PLAYING,
    isPaused: state === PlaybackState.PAUSED,
    isLoading: state === PlaybackState.LOADING,
    isError: state === PlaybackState.ERROR
  };
};

export default useAudioPlayer;
