import { Component, inject } from '@angular/core';
import { ResultsTableComponent } from './components/results-table/results-table';
import { ResultsService } from '@service/results.service';
import { ColumnDef } from '@core/models/athlete-result.model';

@Component({
  selector: 'app-results',
  imports: [ResultsTableComponent],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results {
  private readonly resultsService: ResultsService = inject(ResultsService);

  athletes = this.resultsService.athletes;

  columns: ColumnDef[] = [
    { header: 'Posição', field: 'position' },
    { header: 'Nome do Atleta', field: 'name' },
    { header: '100 m', field: '100 m' },
    { header: 'Salto em Distância', field: 'Long jump' },
    { header: 'Arremesso de Peso', field: 'Shot put' },
    { header: 'Salto em Altura', field: 'High jump' },
    { header: '400 m', field: '400 m' },
    { header: '110 m com Barreira', field: '110 m hurdles' },
    { header: 'Lançamento de Disco', field: 'Discus throw' },
    { header: 'Salto com Vara', field: 'Pole vault' },
    { header: 'Lançamento de Dardo', field: 'Javelin throw' },
    { header: '1500 m', field: '1500 m' },
    { header: 'Total de Pontos', field: 'total' },
  ];

  /** Monta e baixa um CSV com os dados exibidos na tabela. */
  exportCsv(): void {
    const headers = this.columns.map((column) => column.header);
    const rows = this.athletes().map((athlete) => [
      athlete.position,
      athlete.name,
      ...athlete.eventPoints.map((event) => event.points),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(';'))
      .join('\n');

    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'resultados-decathlon.csv';
    link.click();

    URL.revokeObjectURL(url);
  }
}
