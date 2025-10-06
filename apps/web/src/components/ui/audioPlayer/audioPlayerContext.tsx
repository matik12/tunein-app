import {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { Station } from "@/types/api/station";

type AudioPlayerContextValue = {
  isPlaying: boolean;
  currentStation: Station | null;
  playStation: (station: Station) => void;
  togglePlayPause: () => void;
  isLoading: boolean;
  isError: boolean;
};

type AudioPlayerProviderProps = {
  children: ReactNode;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue | undefined>(
  undefined,
);

export const AudioPlayerProvider = ({ children }: AudioPlayerProviderProps) => {
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Effect to handle audio playback when the stream URL changes
  useEffect(() => {
    if (audioRef.current && currentStation) {
      audioRef.current.src = currentStation.streamUrl;
      audioRef.current.play().catch((e) => {
        handleError();
        console.error("Error playing audio:", e);
      });
    }
  }, [currentStation]);

  // Handlers for audio element events
  const handlePlaying = () => {
    setIsPlaying(true);
    setIsLoading(false);
    setIsError(false);
  };
  const handlePause = () => setIsPlaying(false);
  const handleWaiting = () => setIsLoading(true);
  const handleError = () => {
    setIsLoading(false);
    setIsPlaying(false);
    setIsError(true);
  };

  // Effect to attach and clean up audio element event listeners
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("stalled", handleWaiting);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("stalled", handleWaiting);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) {
      return;
    }

    if (isError && currentStation) {
      setIsError(false);
      setIsLoading(true);
      audioRef.current.load();
      audioRef.current.play().catch((e) => {
        console.error("Error retrying audio:", e);
        handleError();
      });

      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => {
        console.error("Error resuming audio:", e);
        handleError();
      });
    }
  }, [isPlaying, isError, currentStation]);

  const playStation = useCallback(
    (station: Station) => {
      setIsError(false);

      if (station.id !== currentStation?.id) {
        setCurrentStation(station);
        setIsLoading(true);
      } else {
        // If it's the same station, just toggle play/pause
        togglePlayPause();
      }
    },
    [currentStation, togglePlayPause],
  );

  const value = {
    isPlaying,
    currentStation,
    playStation,
    togglePlayPause,
    isLoading,
    isError,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="auto" />
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = (): AudioPlayerContextValue => {
  const context = useContext(AudioPlayerContext);

  if (!context) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider",
    );
  }

  return context;
};
