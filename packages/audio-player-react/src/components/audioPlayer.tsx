import AudioCover from "./audioCover";
import AudioMetadata from "./audioMetadata";
import PlayButton from "./playButton";

type AudioPlayerProps = {
  title: string;
  description: string;
  coverUrl: string;
  isLoading: boolean;
  isPlaying: boolean;
  isError: boolean;
  onTogglePlay: () => void;
};

const AudioPlayer = ({
  title,
  description,
  coverUrl,
  isLoading,
  isPlaying,
  isError,
  onTogglePlay,
}: AudioPlayerProps) => (
  <div className="flex items-center justify-between h-24">
    <div className="flex items-center space-x-4 min-w-0">
      <AudioCover coverUrl={coverUrl} title={title} />
      <AudioMetadata
        title={title}
        description={description}
        showError={isError}
      />
    </div>
    <div className="flex items-center space-x-4">
      <PlayButton
        isLoading={isLoading}
        isPlaying={isPlaying}
        isError={isError}
        onTogglePlay={onTogglePlay}
      />
    </div>
  </div>
);

export default AudioPlayer;
