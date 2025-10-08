# Audio Player Library

Extensible audio player library built with TypeScript, designed for streaming audio (radio stations, podcasts) with future support for HLS/ABR streaming.

## Features

- **Composition-based architecture** - Flexible, testable, and maintainable
- **TypeScript first** - Full type safety and IntelliSense support
- **Event-driven** - Subscribe to playback events and state changes
- **Stream optimized** - Built for live audio streaming (radio stations)
- **Extensible** - Easy to add new engines (HLS, DASH, etc.)
- **Vanilla JS support** - Use with or without frontend libraries like React

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     AudioPlayer                         │
│  (Composition Root - Coordinates engine & events)       │
└─────────────────┬───────────────────────┬───────────────┘
                  │                       │
       ┌──────────▼──────────┐ ┌─────────▼──────────┐
       │   IAudioEngine      │ │   EventManager     │
       │   (Pluggable)       │ │   (Observable)     │
       └──────────┬──────────┘ └────────────────────┘
                  │
       ┌──────────┴──────────┐
       │                     │
┌──────▼────────┐   ┌───────▼─────────┐
│StreamEngine   │   │  HLSEngine      │
│(Radio/Live)   │   │  (Future/ABR)   │
└───────────────┘   └─────────────────┘
```

### Core Principles

1. **Separation of Concerns**: Engine handles playback, EventManager handles communication
2. **Open/Closed**: Easy to extend with new engines without modifying existing code
3. **Dependency Inversion**: Depend on abstractions (interfaces), not concrete implementations
4. **Single Responsibility**: Each class has one clear purpose

## Installation

```bash
pnpm install @tunein/audio-player
```

## Quick Start

### Vanilla JavaScript

```javascript
import { AudioPlayerFactory, PlayerEventType } from '@tunein/audio-player';

const player = AudioPlayerFactory.createStreamPlayer();

// Load and play
await player.load({ url: 'https://stream.example.com/radio' }, { autoplay: true, volume: 0.8 });

// Listen to events
player.on(PlayerEventType.STATE_CHANGE, (event) => {
  console.log('State:', event.payload.state);
});

// Control playback
player.play();
player.pause();
player.stop();
player.setVolume(0.5);

// Cleanup
player.destroy();
```

## API Reference

### AudioPlayerFactory

Factory for creating audio players with different engines.

```typescript
// Create a stream player (for radio stations)
const player = AudioPlayerFactory.createStreamPlayer();

// Future: Create HLS player with ABR
// const player = AudioPlayerFactory.createHLSPlayer();
```

### AudioPlayer

Main player interface with playback controls and event management.

#### Methods

- `load(source: AudioSource, options?: PlaybackOptions): Promise<void>`
- `play(options?: { restart?: boolean }): Promise<void>`
- `pause(): void`
- `stop(): void`
- `setVolume(volume: number): void` - Volume from 0.0 to 1.0
- `getVolume(): number`
- `getCurrentTime(): number`
- `getDuration(): number`
- `getState(): PlaybackState`
- `getBufferInfo(): BufferInfo`
- `on<T extends PlayerEventType>(event: T,listener: PlayerEventListener<T>): void`
- `off<T extends PlayerEventType>(event: T, listener: PlayerEventListener<T>): void`
- `destroy(): void`

#### Types

```typescript
interface AudioSource {
  url: string;
  type?: string;
}

interface PlaybackOptions {
  autoplay?: boolean;
  preload?: boolean;
  volume?: number;
  crossOrigin?: 'anonymous' | 'use-credentials';
}

enum PlaybackState {
  IDLE = 'idle',
  LOADING = 'loading',
  PLAYING = 'playing',
  PAUSED = 'paused',
  STOPPED = 'stopped',
  ERROR = 'error',
}
```

### Events

Subscribe to player events:

```typescript
player.on(PlayerEventType.STATE_CHANGE, (event) => {
  console.log('State changed:', event.payload);
});

player.on(PlayerEventType.ERROR, (event) => {
  console.error('Error:', event.payload);
});

player.on(PlayerEventType.VOLUME_CHANGE, (event) => {
  console.log('Volume:', event.payload.volume);
});

player.on(PlayerEventType.TIME_UPDATE, (event) => {
  console.log('Time:', event.payload.currentTime);
});
```

## Extending with Custom Engines

To add a new engine (e.g., HLS with ABR):

### 1. Create Engine Class

```typescript
import { BaseAudioEngine } from '@tunein/audio-player';

export class HLSAudioEngine extends BaseAudioEngine {
  protected async loadSource(source: AudioSource): Promise<void> {
    // Implement HLS loading logic
    // Use hls.js or native HLS support
  }

  // Add HLS-specific methods
  setQualityLevel(level: number): void { }
  getQualityLevels(): Array<QualityLevel> { }
}
```

### 2. Register in Factory

```typescript
// In AudioPlayerFactory.ts
case AudioPlayerType.HLS:
  return new HLSAudioEngine(eventManager);
```

### 3. Add Factory Method

```typescript
static createHLSPlayer(): AudioPlayer {
  return this.createPlayer({ type: AudioPlayerType.HLS });
}
```

## Best Practices

### Memory Management

Always destroy players when done:

```typescript
// Vanilla JS
window.addEventListener('beforeunload', () => {
  player.destroy();
});
```

### Error Handling

```typescript
player.on(PlayerEventType.ERROR, (event) => {
  console.error('Player error:', event.payload);
  // Show user-friendly error message
  // Attempt recovery or fallback
});

try {
  await player.play();
} catch (error) {
  // Handle autoplay policy errors
  console.error('Playback failed:', error);
}
```

### State Management

```typescript
player.on(PlayerEventType.STATE_CHANGE, (event) => {
  const { state, previousState } = event.payload;
  
  // Update UI based on state
  if (state === PlaybackState.LOADING) {
    showLoadingSpinner();
  } else if (state === PlaybackState.PLAYING) {
    updatePlayButton();
  }
});
```

## Future Enhancements

- HLS engine support
- DASH engine support
- Audio visualizations
- Equalizer support
- Playlist management
- Offline playback
