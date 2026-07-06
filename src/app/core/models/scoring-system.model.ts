export enum ScoringType {
  track = 'track',
  field = 'field',
}

/**
 * Enum com os eventos oficiais da competição.
 * Mantém os nomes exatamente como chegam da API.
 */
export enum EventType {
  '100 m' = '100 m',
  'Long jump' = 'Long jump',
  'Shot put' = 'Shot put',
  'High jump' = 'High jump',
  '400 m' = '400 m',
  '110 m hurdles' = '110 m hurdles',
  'Discus throw' = 'Discus throw',
  'Pole vault' = 'Pole vault',
  'Javelin throw' = 'Javelin throw',
  '1500 m' = '1500 m',
}

/**
 * Define se o evento usa conversão para centímetros.
 * Comentário: isso influencia diretamente o cálculo de pontos.
 */
const EVENT_UNIT_CONVERSION: Record<EventType, boolean> = {
  [EventType['100 m']]: false,
  [EventType['Long jump']]: true,
  [EventType['Shot put']]: false,
  [EventType['High jump']]: true,
  [EventType['400 m']]: false,
  [EventType['110 m hurdles']]: false,
  [EventType['Discus throw']]: false,
  [EventType['Pole vault']]: true,
  [EventType['Javelin throw']]: false,
  [EventType['1500 m']]: false,
};

export interface EventConfig {
  name: string;
  isCentimeter: boolean;
}

/**
 * Classe responsável por calcular pontos de cada evento.
 */
export class ScoringSystem {
  event: EventType;
  type: ScoringType;
  A: number;
  B: number;
  C: number;

  constructor(event: EventType, type: ScoringType, a: number, b: number, c: number) {
    this.event = event;
    this.type = type;
    this.A = a;
    this.B = b;
    this.C = c;
  }

  /**
   * Calcula a pontuação do atleta baseado no resultado bruto.
   */
  calculatePoints(value: number): number {
    const convertedValue = EVENT_UNIT_CONVERSION[this.event]
      ? value * 100
      : value;

    const base =
      this.type === ScoringType.track
        ? this.B - convertedValue
        : convertedValue - this.B;

    if (base <= 0) {
      return 0;
    }

    return Math.trunc(this.A * Math.pow(base, this.C));
  }
}
