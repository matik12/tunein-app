type AudioMetadataProps = {
  title: string;
  description: string;
  showError: boolean;
  errorMessage?: string;
};

const AudioMetadata = ({
  title,
  description,
  showError,
  errorMessage,
}: AudioMetadataProps) => (
  <div className="min-w-0">
    <h3
      className={`font-bold text-lg truncate ${showError ? "text-red-400" : "text-white"}`}
    >
      {title}
    </h3>
    {showError ? (
      <p className="text-red-400 text-sm truncate">
        {errorMessage ?? "Failed to load audio. Click to retry."}
      </p>
    ) : (
      <p className="text-gray-400 text-sm truncate">{description}</p>
    )}
  </div>
);

export default AudioMetadata;
