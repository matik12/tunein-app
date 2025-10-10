import EventManager from '../events/eventManager';
import { AudioSource } from '../types/types';

import BaseAudioEngine from './baseAudioEngine';

/**
 * HLS Audio Engine with Adaptive Bitrate Streaming support
 *
 * This is a template for future implementation. To use this, you would need to:
 * 1. Install hls.js: npm install hls.js
 * 2. Import: import Hls from 'hls.js';
 * 3. Uncomment and implement the methods below
 *
 * Features this would provide:
 * - Adaptive bitrate streaming
 * - Better buffering for on-demand audio
 * - Quality level selection
 * - Network recovery mechanisms
 */
export class HLSAudioEngine extends BaseAudioEngine {
  // private hls: Hls | null = null;
  private currentQualityLevel: number = -1; // -1 means auto

  constructor(eventManager: EventManager) {
    super(eventManager);
    // this.validateHLSSupport();
  }

  /**
   * Check if HLS is natively supported or if we need hls.js
   */
  private validateHLSSupport(): boolean {
    const canPlayHLS = this.audio.canPlayType('application/vnd.apple.mpegurl');
    return canPlayHLS !== '';
  }

  protected async loadSource(source: AudioSource): Promise<void> {
    // Implementation would check for native HLS support
    // If native HLS is supported (Safari), use it directly
    // Otherwise, use hls.js for other browsers

    /*
    if (this.audio.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari, iOS)
      return this.loadNativeHLS(source);
    } else if (Hls.isSupported()) {
      // Use hls.js for other browsers
      return this.loadHLSWithLibrary(source);
    } else {
      throw new Error('HLS is not supported in this browser');
    }
    */

    // Placeholder implementation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
      this.audio.src = source.url;
      this.audio.load();

      const onCanPlay = () => {
        this.audio.removeEventListener('canplay', onCanPlay);
        resolve();
      };

      this.audio.addEventListener('canplay', onCanPlay);
    });
  }

  /**
   * Load HLS using native browser support (Safari/iOS)
   */
  private async loadNativeHLS(source: AudioSource): Promise<void> {
    return new Promise((resolve, reject) => {
      const onCanPlay = () => {
        cleanup();
        resolve();
      };

      const onError = () => {
        cleanup();
        reject(new Error('Failed to load HLS stream'));
      };

      const cleanup = () => {
        this.audio.removeEventListener('canplay', onCanPlay);
        this.audio.removeEventListener('error', onError);
      };

      this.audio.addEventListener('canplay', onCanPlay, { once: true });
      this.audio.addEventListener('error', onError, { once: true });

      this.audio.src = source.url;
      this.audio.load();
    });
  }

  /**
   * Load HLS using hls.js library
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async loadHLSWithLibrary(source: AudioSource): Promise<void> {
    /*
    return new Promise((resolve, reject) => {
      if (this.hls) {
        this.hls.destroy();
      }

      this.hls = new Hls({
        // Optimized config for audio streaming
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
        maxBufferSize: 60 * 1000 * 1000, // 60MB
        maxBufferHole: 0.5,
      });

      this.setupHLSEventListeners();

      this.hls.loadSource(source.url);
      this.hls.attachMedia(this.audio);

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // Emit available quality levels
        const levels = this.hls!.levels.map((level, index) => ({
          index,
          bitrate: level.bitrate,
          width: level.width,
          height: level.height,
        }));

        // Emit event with metadata / quality levels (implement event in EventManager if needed)
        console.log('HLS Quality Levels:', levels);

        resolve();
      });

      this.hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          reject(new Error(`HLS Error: ${data.type}`));
        }
      });
    });
    */
  }

  /**
   * Set up HLS-specific event listeners for quality changes, buffering, etc.
   */
  private setupHLSEventListeners(): void {
    /*
    if (!this.hls) return;

    this.hls.on(Hls.Events.LEVEL_SWITCHING, (event, data) => {
      this.eventManager.emit('qualityChanging', {
        level: data.level,
      });
    });

    this.hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
      this.currentQualityLevel = data.level;
      this.eventManager.emit('qualityChanged', {
        level: data.level,
        bitrate: this.hls!.levels[data.level].bitrate,
      });
    });

    this.hls.on(Hls.Events.FRAG_BUFFERED, (event, data) => {
      this.eventManager.emit(PlayerEventType.BUFFER_CHANGE, {
        buffered: this.audio.buffered,
      });
    });
    */
  }

  /**
   * Set quality level manually
   * @param level -1 for auto, or specific level index
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setQualityLevel(level: number): void {
    /*
    if (this.hls) {
      this.hls.currentLevel = level;
      this.currentQualityLevel = level;
    }
    */
  }

  /**
   * Get available quality levels
   */
  getQualityLevels(): Array<{ index: number; bitrate: number }> {
    /*
    if (this.hls) {
      return this.hls.levels.map((level, index) => ({
        index,
        bitrate: level.bitrate,
      }));
    }
    */
    return [];
  }

  /**
   * Get current quality level
   */
  getCurrentQualityLevel(): number {
    return this.currentQualityLevel;
  }

  destroy(): void {
    /*
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
    */
    super.destroy();
  }
}

/**
 * To enable HLS support in the factory:
 *
 * 1. Uncomment this in AudioPlayerFactory.ts:
 *
 *    case AudioPlayerType.HLS:
 *      return new HLSAudioEngine(eventManager);
 *
 * 2. Add to AudioPlayerType enum:
 *
 *    export enum AudioPlayerType {
 *      STREAM = 'stream',
 *      HLS = 'hls',
 *    }
 *
 * 3. Add factory method:
 *
 *    static createHLSPlayer(): AudioPlayer {
 *      return this.createPlayer({ type: AudioPlayerType.HLS });
 *    }
 */
