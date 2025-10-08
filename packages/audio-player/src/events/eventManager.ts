import {
  PlayerEventType,
  PlayerEventPayloads,
  PlayerEvent,
  PlayerEventListener,
} from "../types/types";

export default class EventManager {
  // The internal listeners map uses 'any' for simplicity
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private listeners: Map<PlayerEventType, Set<PlayerEventListener<any>>> =
    new Map();

  on<T extends PlayerEventType>(
    event: T,
    listener: PlayerEventListener<T>,
  ): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(listener);
  }

  off<T extends PlayerEventType>(
    event: T,
    listener: PlayerEventListener<T>,
  ): void {
    const eventListeners = this.listeners.get(event);

    if (eventListeners) {
      eventListeners.delete(listener);
    }
  }

  emit<T extends PlayerEventType>(
    type: T,
    payload: PlayerEventPayloads[T],
  ): void {
    const event: PlayerEvent<T> = {
      type,
      payload,
      timestamp: Date.now(),
    };

    const eventListeners = this.listeners.get(type);

    if (eventListeners) {
      eventListeners.forEach((listener) => listener(event));
    }
  }

  removeAllListeners(event?: PlayerEventType): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  hasListeners(event: PlayerEventType): boolean {
    return this.listeners.has(event) && this.listeners.get(event)!.size > 0;
  }
}
