import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { AthleteResult } from '@models/athlete-result.model';
import { EventType, ScoringSystem } from '@models/scoring-system.model';
import { shareReplay, switchMap, tap } from 'rxjs';
import { AthleteDTO, AthleteDTOComPosicao, ModalityPointsDTO } from './dto/AtheteDTO';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  private readonly url = 'resultados.json';
  private readonly urlSistemaPontuacao = 'sistema_pontuacao.json';

  private readonly http = inject(HttpClient);

  private readonly scoringSystem = signal<ScoringSystem[] | null>(null);
  private readonly athleteResults = signal<AthleteResult[] | null>(null);

  // dispara a chamada da API automaticamente e já converte pra signal
  private readonly load = toSignal(
    this.http.get<AthleteResult[]>(this.url).pipe(
      tap((athletes) => this.athleteResults.set(athletes)),
      switchMap(() => this.http.get<any[]>(this.urlSistemaPontuacao)),
      tap((scoringData) => {
        const instancias = scoringData.map(
          (s) => new ScoringSystem(s.event, s.type, s.A, s.B, s.C),
        );
        this.scoringSystem.set(instancias);
      }),
      shareReplay(1),
    ),
    { initialValue: null },
  );

  // computed público que o componente consome direto — sem subscribe, sem chamar método
  athletes = computed<AthleteDTOComPosicao[]>(() => {
    const scoringLoaded = this.load();
    const athletes = this.athleteResults();
    const scoringSystems = this.scoringSystem();

    if (!athletes || !scoringSystems) {
      return [];
    }

    const ordenados = athletes
      .map((athlete) => this.calcularPontuacaoAtleta(athlete, scoringSystems))
      .sort((a, b) => this.getTotalPoints(b) - this.getTotalPoints(a));

    return this.calcularPosicoes(ordenados);
  });

  private calcularPontuacaoAtleta(
    athlete: AthleteResult,
    scoringSystems: ScoringSystem[],
  ): AthleteDTO {
    // console.log(scoringSystems)
    const modalityPoints: ModalityPointsDTO[] = athlete.results.map((result) => {
      // console.log(result)
      const scoring = scoringSystems.find(
        (s) => EventType[Number(EventType[s.event])] === result.type,
      );

      console.log(scoring)


      const points = scoring
        ? scoring.calculatePoints(this.convertTimeToSeconds(result.result))
        : 0;

      return { name: result.type, points };
    });

    const total = modalityPoints
      .map((modality) => modality.points)
      .reduce((acc, current) => acc + current, 0);

    modalityPoints.push({
      name: 'total',
      points: total,
    });

    return { name: athlete.athlete, modalityPoints };
  }

  private getTotalPoints(athlete: AthleteDTO): number {
    return athlete.modalityPoints.find((modality) => modality.name == 'total')?.points ?? 0;
  }

  convertTimeToSeconds(time: string | number): number {
    // Se já for número, retorna direto
    if (typeof time === 'number') {
      return time;
    }

    // Se for string mas sem ":", converte pra número direto
    if (!time.includes(':')) {
      return Number(time);
    }

    // Formato "mm:ss.ss" -> ex: "3:53.79"
    const [minutes, seconds] = time.split(':');
    return Number(minutes) * 60 + Number(seconds);
  }

  private calcularPosicoes(athletes: AthleteDTO[]): AthleteDTOComPosicao[] {
    const resultado: AthleteDTOComPosicao[] = [];
    let i = 0;

    while (i < athletes.length) {
      const pontosAtual = this.getTotalPoints(athletes[i]);

      // acha até onde vai o empate (todos com a mesma pontuação)
      let fimDoEmpate = i;
      while (
        fimDoEmpate + 1 < athletes.length &&
        this.getTotalPoints(athletes[fimDoEmpate + 1]) === pontosAtual
      ) {
        fimDoEmpate++;
      }

      const posicaoInicial = i + 1;
      const posicaoFinal = fimDoEmpate + 1;

      const label =
        posicaoInicial === posicaoFinal ? `${posicaoInicial}` : `${posicaoInicial}-${posicaoFinal}`;

      for (let k = i; k <= fimDoEmpate; k++) {
        resultado.push({ ...athletes[k], position: label });
      }

      i = fimDoEmpate + 1; // pula pro próximo grupo
    }

    return resultado;
  }
}
