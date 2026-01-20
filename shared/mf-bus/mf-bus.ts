import { filter, map, Observable, fromEvent } from 'rxjs';

const BUS_EVENT_NAME = 'mf:bus';

export type Topic = string;

export type BusMeta = {
  source: string;          // 'shell' | 'catalog' | 'payments' | ...
  version: string;         // '1.0.0'
  ts: number;
  correlationId?: string;
};

export type Envelope<TPayload = unknown> = {
  topic: Topic;
  payload: TPayload;
  meta: BusMeta;
};

export function publish<TPayload>(topic: Topic, payload: TPayload, meta: Omit<BusMeta, 'ts'>) {
  const envelope: Envelope<TPayload> = {
    topic,
    payload,
    meta: { ...meta, ts: Date.now() }
  };

  document.dispatchEvent(
    new CustomEvent<Envelope>(BUS_EVENT_NAME, { detail: envelope })
  );
}

export function onTopic<TPayload>(topic: Topic): Observable<Envelope<TPayload>> {
  return fromEvent<CustomEvent<Envelope>>(document, BUS_EVENT_NAME).pipe(
    map((e) => e.detail),
    filter((msg) => msg?.topic === topic)
  ) as Observable<Envelope<TPayload>>;
}
