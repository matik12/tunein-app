import { useEffect, useState } from "react";
import {
  AudioPlayerFactory,
  AudioSource,
  PlayerEventType,
} from "@tunein/audio-player";
import { AudioPlayerComponent, useAudioPlayerInstance } from "../src/index";

// Example: Simple radio station player
export const SimpleRadioPlayer = () => {
  const [player] = useState(() => AudioPlayerFactory.createStreamPlayer());
  const playerState = useAudioPlayerInstance(player);

  const radioStation: AudioSource = {
    url: "https://stream.example.com/radio",
  };

  const handleLoadAndPlay = async () => {
    await playerState.load(radioStation, { autoplay: true, volume: 0.7 });
  };

  return (
    <div>
      <h2>Simple Radio Player</h2>
      <button onClick={handleLoadAndPlay}>Load Radio Station</button>
      <AudioPlayerComponent player={playerState} />
    </div>
  );
};

// Example: Multi-station radio player
export const MultiStationRadioPlayer = () => {
  const [player] = useState(() => AudioPlayerFactory.createStreamPlayer());
  const playerState = useAudioPlayerInstance(player);

  const stations: AudioSource[] = [
    {
      url: "https://stream1.example.com/radio",
    },
    {
      url: "https://stream2.example.com/radio",
    },
    {
      url: "https://stream3.example.com/radio",
    },
  ];

  const [currentStation, setCurrentStation] = useState<number>(0);

  const switchStation = async (index: number) => {
    setCurrentStation(index);
    await playerState.load(stations[index], { autoplay: true });
  };

  return (
    <div className="multi-station-player">
      <h2>Radio Stations</h2>
      <div className="station-list">
        {stations.map((station, index) => (
          <button
            key={index}
            onClick={() => switchStation(index)}
            className={currentStation === index ? "active" : ""}
          >
            {station.url}
          </button>
        ))}
      </div>
      <AudioPlayerComponent player={playerState} />
    </div>
  );
};

// Example: Advanced player with custom event handling
export const AdvancedRadioPlayer = () => {
  const [player] = useState(() => AudioPlayerFactory.createStreamPlayer());
  const playerState = useAudioPlayerInstance(player);
  const [eventLog, setEventLog] = useState<string[]>([]);

  useEffect(() => {
    // Custom event handlers
    const logEvent = (eventType: string) => (event: any) => {
      const logEntry = `[${new Date().toLocaleTimeString()}] ${eventType}: ${JSON.stringify(event.payload)}`;
      setEventLog((prev) => [...prev.slice(-9), logEntry]); // Keep last 10 events
    };

    player.on(PlayerEventType.STATE_CHANGE, logEvent("STATE_CHANGE"));
    player.on(PlayerEventType.ERROR, logEvent("ERROR"));
    player.on(PlayerEventType.BUFFER_CHANGE, logEvent("BUFFER"));

    return () => {
      // Cleanup is handled by useAudioPlayerInstance
    };
  }, [player]);

  const radioStation: AudioSource = {
    url: "https://stream.example.com/radio",
  };

  const handleLoad = async () => {
    await playerState.load(radioStation, {
      autoplay: false,
      volume: 0.5,
      crossOrigin: "anonymous",
    });
  };

  return (
    <div className="advanced-player">
      <h2>Advanced Radio Player</h2>
      <button onClick={handleLoad}>Load Station</button>
      <AudioPlayerComponent
        player={playerState}
        showVolume={true}
        showState={true}
      />

      <div className="event-log">
        <h3>Event Log</h3>
        <ul>
          {eventLog.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
