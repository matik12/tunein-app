export enum PlaybackState {
  IDLE = 'idle',
  LOADING = 'loading',
  PLAYING = 'playing',
  PAUSED = 'paused',
  STOPPED = 'stopped',
  ERROR = 'error'
}

export enum PlayerEventType {
  STATE_CHANGE = 'stateChange',
  VOLUME_CHANGE = 'volumeChange',
  ERROR = 'error',
  BUFFER_CHANGE = 'bufferChange',
  TIME_UPDATE = 'timeUpdate'
}

export interface PlayerEventPayloads {
  [PlayerEventType.STATE_CHANGE]: {
    state: PlaybackState;
    previousState: PlaybackState;
  };
  [PlayerEventType.VOLUME_CHANGE]: { volume: number; muted: boolean };
  [PlayerEventType.ERROR]: { message: string; code?: number };
  [PlayerEventType.BUFFER_CHANGE]: BufferInfo;
  [PlayerEventType.TIME_UPDATE]: { currentTime: number; duration: number };
}

export interface PlayerEvent<T extends PlayerEventType> {
  type: T;
  payload: PlayerEventPayloads[T];
  timestamp: number;
}

export type PlayerEventListener<T extends PlayerEventType> = (event: PlayerEvent<T>) => void;

export interface PlaybackOptions {
  autoplay?: boolean;
  preload?: boolean;
  volume?: number;
  crossOrigin?: 'anonymous' | 'use-credentials';
}

export interface AudioSource {
  url: string;
  type?: string;
}

export interface BufferInfo {
  buffered: TimeRanges | null;
  duration: number;
}

export interface IAudioEngine {
  load(source: AudioSource, options?: PlaybackOptions): Promise<void>;
  play(options?: { restart?: boolean }): Promise<void>;
  pause(): void;
  stop(): void;
  setVolume(volume: number): void;
  getVolume(): number;
  getCurrentTime(): number;
  getDuration(): number;
  getState(): PlaybackState;
  getBufferInfo(): BufferInfo;
  destroy(): void;
}

export interface IAudioPlayer extends IAudioEngine {
  on<T extends PlayerEventType>(event: T, listener: PlayerEventListener<T>): void;
  off<T extends PlayerEventType>(event: T, listener: PlayerEventListener<T>): void;
}
