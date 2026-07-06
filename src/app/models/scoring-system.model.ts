export enum ScoringType {
  track,
  field,
}

export enum EventType {
  '100 m',
  'Long jump',
  'Shot put',
  'High jump',
  '400 m',
  '110 m hurdles',
  'Discus throw',
  'Pole vault',
  'Javelin throw',
  '1500 m',
}

export interface EventConfig {
  name: string;
  isCentimeter: boolean;
}

const EVENTS: Record<string, boolean> = {
  '100 m': false,
  'Long jump':  true ,
  'Shot put':  false ,
  'High jump':  true ,
  '400 m':  false ,
  '110 m hurdles':  false ,
  'Discus throw':  false ,
  'Pole vault':  true ,
  'Javelin throw': false ,
  '1500 m':  false ,
};

export class ScoringSystem {
  event: EventType;
  type: string;
  A: number;
  B: number;
  C: number;

  constructor(event: EventType, type: string, a: number, b: number, c: number) {
    this.event = event;
    this.type = type;
    this.A = a;
    this.B = b;
    this.C = c;
  }

  calculatePoints(points: number): number {

    const convertedValue = EVENTS[this.event] ? points * 100 : points;

    const base = this.type == 'track' ? this.B - convertedValue : convertedValue - this.B;

    if (base < 0) {
      return 0;
    }

    return Math.trunc(Number(this.A * Math.pow(base, this.C)));
  }
}
