import {
  IAudioPlayer,
  IAudioEngine,
  PlaybackState,
  AudioSource,
  PlaybackOptions,
  PlayerEventType,
  PlayerEventListener,
  BufferInfo,
} from "../types/types";
import EventManager from "../events/eventManager";

/**
 * Main AudioPlayer class that composes an audio engine with event management
 * Follows composition over inheritance pattern for flexibility
 */
export default class AudioPlayer implements IAudioPlayer {
  private engine: IAudioEngine;
  private eventManager: EventManager;

  constructor(engine: IAudioEngine, eventManager?: EventManager) {
    this.eventManager = eventManager || new EventManager();
    this.engine = engine;
  }

  // Delegate engine methods
  async load(source: AudioSource, options?: PlaybackOptions): Promise<void> {
    return this.engine.load(source, options);
  }

  async play(options?: { restart?: boolean }): Promise<void> {
    return this.engine.play(options);
  }

  pause(): void {
    this.engine.pause();
  }

  stop(): void {
    this.engine.stop();
  }

  setVolume(volume: number): void {
    this.engine.setVolume(volume);
  }

  getVolume(): number {
    return this.engine.getVolume();
  }

  getCurrentTime(): number {
    return this.engine.getCurrentTime();
  }

  getDuration(): number {
    return this.engine.getDuration();
  }

  getState(): PlaybackState {
    return this.engine.getState();
  }

  getBufferInfo(): BufferInfo {
    return this.engine.getBufferInfo();
  }

  // Event management methods
  on<T extends PlayerEventType>(
    event: T,
    listener: PlayerEventListener<T>,
  ): void {
    this.eventManager.on(event, listener);
  }

  off<T extends PlayerEventType>(
    event: T,
    listener: PlayerEventListener<T>,
  ): void {
    this.eventManager.off(event, listener);
  }

  destroy(): void {
    this.engine.destroy();
    this.eventManager.removeAllListeners();
  }

  // Utility methods
  isPlaying(): boolean {
    return this.getState() === PlaybackState.PLAYING;
  }

  isPaused(): boolean {
    return this.getState() === PlaybackState.PAUSED;
  }

  isLoading(): boolean {
    return this.getState() === PlaybackState.LOADING;
  }
}
