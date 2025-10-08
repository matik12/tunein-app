import { useStationAudioPlayer } from "@/context/stationAudioPlayerContext";
import Container from "./container";
import { AudioPlayer as BaseAudioPlayer } from "@tunein/audio-player-react";

const AudioPlayer = () => {
  const { currentStation, isPlaying, togglePlay, isLoading, isError } =
    useStationAudioPlayer();

  // Don't render the player if no station is selected
  if (!currentStation) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm z-50 shadow-t-lg border-t border-slate-700">
      <Container>
        <BaseAudioPlayer
          title={currentStation.name}
          description={currentStation.description}
          coverUrl={currentStation.imgUrl}
          isLoading={isLoading}
          isPlaying={isPlaying}
          isError={isError}
          onTogglePlay={togglePlay}
        />
      </Container>
    </div>
  );
};

export default AudioPlayer;
