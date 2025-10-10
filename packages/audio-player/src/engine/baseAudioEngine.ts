import EventManager from '../events/eventManager';
import { IAudioEngine, PlaybackState, AudioSource, PlaybackOptions, PlayerEventType, BufferInfo } from '../types/types';

export default abstract class BaseAudioEngine implements IAudioEngine {
  protected audio: HTMLAudioElement;
  protected state: PlaybackState = PlaybackState.IDLE;
  protected eventManager: EventManager;
  protected currentSource: AudioSource | null = null;

  constructor(eventManager: EventManager) {
    this.audio = new Audio();
    this.eventManager = eventManager;
    this.setupAudioListeners();
  }

  protected setupAudioListeners(): void {
    this.audio.addEventListener('loadstart', () => {
      this.updateState(PlaybackState.LOADING);
    });

    this.audio.addEventListener('canplay', () => {
      if (this.state === PlaybackState.LOADING) {
        this.updateState(PlaybackState.IDLE);
      }
    });

    this.audio.addEventListener('playing', () => {
      this.updateState(PlaybackState.PLAYING);
    });

    this.audio.addEventListener('pause', () => {
      if (this.state !== PlaybackState.STOPPED) {
        this.updateState(PlaybackState.PAUSED);
      }
    });

    this.audio.addEventListener('ended', () => {
      this.updateState(PlaybackState.STOPPED);
    });

    this.audio.addEventListener('error', () => {
      this.updateState(PlaybackState.ERROR);
      this.eventManager.emit(PlayerEventType.ERROR, {
        message: this.audio.error?.message || 'Unknown error',
        code: this.audio.error?.code
      });
    });

    this.audio.addEventListener('volumechange', () => {
      this.eventManager.emit(PlayerEventType.VOLUME_CHANGE, {
        volume: this.audio.volume,
        muted: this.audio.muted
      });
    });

    this.audio.addEventListener('timeupdate', () => {
      this.eventManager.emit(PlayerEventType.TIME_UPDATE, {
        currentTime: this.audio.currentTime,
        duration: this.audio.duration
      });
    });

    this.audio.addEventListener('progress', () => {
      this.eventManager.emit(PlayerEventType.BUFFER_CHANGE, this.getBufferInfo());
    });
  }

  protected updateState(newState: PlaybackState): void {
    const previousState = this.state;
    this.state = newState;
    this.eventManager.emit(PlayerEventType.STATE_CHANGE, {
      state: newState,
      previousState
    });
  }

  async load(source: AudioSource, options: PlaybackOptions = {}): Promise<void> {
    this.currentSource = source;

    if (options.crossOrigin) {
      this.audio.crossOrigin = options.crossOrigin;
    }

    if (options.preload !== undefined) {
      this.audio.preload = options.preload ? 'auto' : 'none';
    }

    if (options.volume !== undefined) {
      this.setVolume(options.volume);
    }

    await this.loadSource(source);

    if (options.autoplay) {
      await this.play();
    }
  }

  protected abstract loadSource(source: AudioSource): Promise<void>;

  async play({ restart = false } = {}): Promise<void> {
    if (restart && this.currentSource) {
      this.stop();
      await this.load(this.currentSource);
    }

    try {
      await this.audio.play();
    } catch (error) {
      this.updateState(PlaybackState.ERROR);
      this.eventManager.emit(PlayerEventType.ERROR, {
        message: error instanceof Error ? error.message : 'Playback failed'
      });
      throw error;
    }
  }

  pause(): void {
    this.audio.pause();
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.updateState(PlaybackState.STOPPED);
  }

  setVolume(volume: number): void {
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  getVolume(): number {
    return this.audio.volume;
  }

  getCurrentTime(): number {
    return this.audio.currentTime;
  }

  getDuration(): number {
    return this.audio.duration || 0;
  }

  getState(): PlaybackState {
    return this.state;
  }

  getBufferInfo(): BufferInfo {
    return {
      buffered: this.audio.buffered,
      duration: this.audio.duration || 0
    };
  }

  destroy(): void {
    this.stop();
    this.audio.src = '';
    this.audio.load();
    this.currentSource = null;
  }
}
