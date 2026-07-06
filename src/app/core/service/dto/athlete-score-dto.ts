export interface AthleteScoreDto {
  name: string;
  eventPoints: EventPointsDto[];
}

export interface RankedAthleteDto extends AthleteScoreDto {
  position: string;
}

export interface EventPointsDto {
  name: string;
  points: number;
}

// Formato bruto que vem do scoring-system.json, antes de virar instância de ScoringSystem
export interface ScoringSystemRawDto {
  event: string;
  type: string;
  A: number;
  B: number;
  C: number;
}
