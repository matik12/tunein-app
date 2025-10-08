import { useRef, useEffect } from "react";
import { AudioPlayer } from "@tunein/audio-player";
import useAudioPlayer from "./useAudioPlayer";

/**
 * Hook for creating and managing a player instance lifecycle
 */
const useAudioPlayerInstance = (player: AudioPlayer) => {
  const playerRef = useRef(player);

  useEffect(() => {
    const playerRefCurrent = playerRef.current;

    return () => {
      playerRefCurrent.destroy();
    };
  }, []);

  return useAudioPlayer(playerRef.current);
};

export default useAudioPlayerInstance;
