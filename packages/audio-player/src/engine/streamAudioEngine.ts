import BaseAudioEngine from "./baseAudioEngine";
import { AudioSource } from "../types/types";
import EventManager from "../events/eventManager";

/**
 * Audio engine optimized for streaming audio (radio stations, live streams)
 * Designed for continuous playback without seeking capabilities
 */
export class StreamAudioEngine extends BaseAudioEngine {
  constructor(eventManager: EventManager) {
    super(eventManager);
  }

  protected async loadSource(source: AudioSource): Promise<void> {
    return new Promise((resolve, reject) => {
      const onCanPlay = () => {
        cleanup();
        resolve();
      };

      const onError = () => {
        cleanup();
        reject(new Error("Failed to load stream"));
      };

      const cleanup = () => {
        this.audio.removeEventListener("canplay", onCanPlay);
        this.audio.removeEventListener("error", onError);
      };

      this.audio.addEventListener("canplay", onCanPlay, { once: true });
      this.audio.addEventListener("error", onError, { once: true });

      this.audio.src = source.url;
      this.audio.load();
    });
  }
}
