import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { AthleteResult } from '@core/models/athlete-result.model';
import { EventType, ScoringSystem, ScoringType } from '@core/models/scoring-system.model';
import { shareReplay, switchMap, tap } from 'rxjs';
import {
  AthleteScoreDto,
  EventPointsDto,
  RankedAthleteDto,
  ScoringSystemRawDto,
} from './dto/athlete-score-dto';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private readonly resultsUrl = 'assets/data/results.json';
  private readonly scoringSystemUrl = 'assets/data/scoring-system.json';

  private readonly http = inject(HttpClient);

  private readonly scoringSystems = signal<ScoringSystem[] | null>(null);
  private readonly athleteResults = signal<AthleteResult[] | null>(null);

  // dispara a chamada da API automaticamente e já converte pra signal
  private readonly load = toSignal(
    this.http.get<AthleteResult[]>(this.resultsUrl).pipe(
      tap((athletes) => this.athleteResults.set(athletes)),

      switchMap(() => this.http.get<ScoringSystemRawDto[]>(this.scoringSystemUrl)),

      tap((data) => {
        const systems = data.map(
          (item) =>
            new ScoringSystem(
              item.event as EventType,
              item.type as ScoringType,
              item.A,
              item.B,
              item.C,
            ),
        );

        this.scoringSystems.set(systems);
      }),

      shareReplay(1),
    ),
    { initialValue: null },
  );

  // computed público que o componente consome direto — sem subscribe, sem chamar método
  athletes = computed<RankedAthleteDto[]>(() => {
    this.load(); // garante que a busca seja disparada e rastreada pelo computed
    const athleteResults = this.athleteResults();
    const scoringSystems = this.scoringSystems();

    if (!athleteResults || !scoringSystems) {
      return [];
    }

    const scoredAthletes = athleteResults
      .map((athlete) => this.calculateAthleteScore(athlete, scoringSystems))
      .sort((a, b) => this.getTotalPoints(b) - this.getTotalPoints(a));

    return this.assignPositions(scoredAthletes);
  });

  private calculateAthleteScore(athlete: AthleteResult, systems: ScoringSystem[]): AthleteScoreDto {
    const eventPoints: EventPointsDto[] = athlete.results.map((result) => {
      const scoring = systems.find((system) => system.event === result.type);

      const points = scoring
        ? scoring.calculatePoints(this.convertTimeToSeconds(result.result))
        : 0;

      return {
        name: result.type,
        points,
      };
    });

    const total = eventPoints.reduce((sum, e) => sum + e.points, 0);

    return {
      name: athlete.athlete,
      eventPoints: [...eventPoints, { name: 'total', points: total }],
    };
  }

  private getTotalPoints(athlete: AthleteScoreDto): number {
    return athlete.eventPoints.find((event) => event.name === 'total')?.points ?? 0;
  }

  convertTimeToSeconds(time: string | number): number {
    if (typeof time === 'number') {
      return time;
    }

    if (!time.includes(':')) {
      return Number(time);
    }

    // Formato "mm:ss.ss" -> ex: "3:53.79"
    const [minutes, seconds] = time.split(':');
    return Number(minutes) * 60 + Number(seconds);
  }

  // Agrupa atletas com a mesma pontuação total na mesma posição (ex.: "3-4" para empate).
  private assignPositions(athletes: AthleteScoreDto[]): RankedAthleteDto[] {
    const ranked: RankedAthleteDto[] = [];
    let index = 0;

    while (index < athletes.length) {
      const currentPoints = this.getTotalPoints(athletes[index]);

      let tieEndIndex = index;
      while (
        tieEndIndex + 1 < athletes.length &&
        this.getTotalPoints(athletes[tieEndIndex + 1]) === currentPoints
      ) {
        tieEndIndex++;
      }

      const startPosition = index + 1;
      const endPosition = tieEndIndex + 1;
      const positionLabel =
        startPosition === endPosition ? `${startPosition}` : `${startPosition}-${endPosition}`;

      for (let k = index; k <= tieEndIndex; k++) {
        ranked.push({ ...athletes[k], position: positionLabel });
      }

      index = tieEndIndex + 1;
    }

    return ranked;
  }
}
