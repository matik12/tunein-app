import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { AudioPlayerFactory } from "@tunein/audio-player";
import { useAudioPlayerInstance } from "@tunein/audio-player-react";
import { Station } from "@/types/api/station";

type StationAudioPlayerContextValue = {
  isPlaying: boolean;
  isLoading: boolean;
  isError: boolean;
  currentStation: Station | null;
  playStation: (station: Station) => void;
  togglePlay: () => void;
};

type StationAudioPlayerProviderProps = {
  children: ReactNode;
};

const StationAudioPlayerContext = createContext<
  StationAudioPlayerContextValue | undefined
>(undefined);

export const StationAudioPlayerProvider = ({
  children,
}: StationAudioPlayerProviderProps) => {
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const { load, play, pause, isError, isPlaying, isLoading } =
    useAudioPlayerInstance(AudioPlayerFactory.createStreamPlayer());

  useEffect(() => {
    if (currentStation) {
      load({ url: currentStation.streamUrl });
      play().catch((e) => {
        console.error("Error playing audio:", e);
      });
    }
  }, [currentStation]);

  const togglePlay = useCallback(() => {
    if (isError && currentStation) {
      play({ restart: true }).catch((e) => {
        console.error("Error retrying audio:", e);
      });

      return;
    }

    if (isPlaying) {
      pause();
    } else {
      play().catch((e) => {
        console.error("Error resuming audio:", e);
      });
    }
  }, [isPlaying, isError, currentStation]);

  const playStation = useCallback(
    (station: Station) => {
      if (station.id !== currentStation?.id) {
        setCurrentStation(station);
      } else {
        // If it's the same station, just toggle play/pause
        togglePlay();
      }
    },
    [currentStation, togglePlay],
  );

  const value = {
    isPlaying,
    isLoading,
    isError,
    currentStation,
    playStation,
    togglePlay,
  };

  return (
    <StationAudioPlayerContext.Provider value={value}>
      {children}
    </StationAudioPlayerContext.Provider>
  );
};

export const useStationAudioPlayer = (): StationAudioPlayerContextValue => {
  const context = useContext(StationAudioPlayerContext);

  if (!context) {
    throw new Error(
      "useStationAudioPlayer must be used within an StationAudioPlayerProvider",
    );
  }

  return context;
};
