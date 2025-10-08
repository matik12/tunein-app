# Audio Player React Library

Audio player react library built with TypeScript/Tailwind, designed to provide React UI components for ease of development.

## Features

- **React components** - Ready-to-use UI components
- **React hooks** - Audio player state management

## Installation

```bash
pnpm install @tunein/audio-player-react
```

## Quick Start

### React Usage

```tsx
import { AudioPlayerFactory, useAudioPlayerInstance } from '@tunein/audio-player';

function RadioPlayer() {
  const [player] = useState(() => AudioPlayerFactory.createStreamPlayer());
  const playerState = useAudioPlayerInstance(player);

  const loadStation = async () => {
    await playerState.load({ url: 'https://stream.example.com/radio' }, { autoplay: true });
  };

  return (
    <div>
      <button onClick={loadStation}>Load Station</button>
      <AudioPlayerComponent player={playerState} />
    </div>
  );
}
```

## API Reference

### React Hooks

#### useAudioPlayer

Hook for managing player state in React components.

```typescript
const playerState = useAudioPlayer(player);

// Access state
playerState.state;        // PlaybackState
playerState.isPlaying;    // boolean
playerState.isPaused;     // boolean
playerState.isLoading;    // boolean
playerState.isError;      // boolean
playerState.volume;       // number
playerState.error;        // string | null

// Methods
playerState.load(source, options);
playerState.play();
playerState.pause();
playerState.stop();
playerState.setVolume(0.5);
```

#### useAudioPlayerInstance

Hook that creates and manages a player instance lifecycle.

```typescript
const playerState = useAudioPlayerInstance(player);
// Automatically cleans up player on component unmount
```

### React Components

#### AudioPlayerComponent

Complete player UI with all controls.

```tsx
<AudioPlayer
  title={station.name}
  description={station.description}
  coverUrl={station.imgUrl}
  isLoading={isLoading}
  isPlaying={isPlaying}
  isError={isError}
  onTogglePlay={togglePlay}
/>
```

#### Individual Components

```tsx
<AudioCover coverUrl={coverUrl} title={title} />
<AudioMetadata title={title} description={description} showError={isError} />
<PlayButton isLoading={isLoading} isPlaying={isPlaying} isError={isError} onTogglePlay={onTogglePlay} />
```

## Best Practices

### Memory Management

Always destroy players when done:

```typescript
// React
useEffect(() => {
  return () => player.destroy();
}, [player]);
```
