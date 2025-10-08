import AudioPlayer from "./audioPlayer";
import { StreamAudioEngine } from "../engine/streamAudioEngine";
import EventManager from "../events/eventManager";
import { IAudioEngine } from "../types/types";

export enum AudioPlayerType {
  STREAM = "stream",
  // Future: HLS = 'hls',
}

export interface AudioPlayerFactoryConfig {
  type: AudioPlayerType;
}

/**
 * Factory for creating audio players with different engines
 */
export class AudioPlayerFactory {
  static createPlayer(config: AudioPlayerFactoryConfig): AudioPlayer {
    const eventManager = new EventManager();
    const engine = this.createEngine(config.type, eventManager);

    return new AudioPlayer(engine, eventManager);
  }

  private static createEngine(
    type: AudioPlayerType,
    eventManager: EventManager,
  ): IAudioEngine {
    switch (type) {
      case AudioPlayerType.STREAM:
        return new StreamAudioEngine(eventManager);
      // Future implementation:
      // case AudioPlayerType.HLS:
      //   return new HLSAudioEngine(eventManager);
      default:
        throw new Error(`Unsupported player type: ${type}`);
    }
  }

  /**
   * Create a stream player (for radio stations, live streams)
   */
  static createStreamPlayer(): AudioPlayer {
    return this.createPlayer({ type: AudioPlayerType.STREAM });
  }

  /**
   * Future: Create an HLS player with adaptive bitrate streaming
   */
  // static createHLSPlayer(): AudioPlayer {
  //   return this.createPlayer({ type: AudioPlayerType.HLS });
  // }
}
