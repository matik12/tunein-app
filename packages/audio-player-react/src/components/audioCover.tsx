type AudioCoverProps = {
  coverUrl: string;
  title: string;
};

const AudioCover = ({ coverUrl, title }: AudioCoverProps) => (
  <img src={coverUrl} alt={`${title} cover`} className="w-16 h-16 rounded-md object-cover shadow-lg flex-shrink-0" />
);

export default AudioCover;
