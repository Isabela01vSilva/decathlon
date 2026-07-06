import { Component, inject } from '@angular/core';
import { ResultsTableComponent } from './results-table/results-table';
import { ResultsService } from '@service/results.service';
import { ColumnDef } from '@models/athlete-result.model';

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
    {
      header: 'Posição',
      field: 1,
    },
    {
      header: 'Nome do Atleta',
      field: 2,
    },
    {
      header: '100 m',
      field: 5,
    },
    {
      header: 'Long jump',
      field: 3,
    },
    {
      header: 'Shot put',
      field: 4,
    },
    {
      header: 'High jump',
      field: 5,
    },
    {
      header: '400 m',
      field: 6,
    },
    {
      header: '110 m hurdles',
      field: 7,
    },
    {
      header: 'Discus throw',
      field: 8,
    },
    {
      header: 'Pole vault',
      field: 9,
    },
    {
      header: 'Javelin throw',
      field: 10,
    },
    {
      header: '1500 m',
      field: 11,
    },
    {
      header: 'Total de Pontos',
      field: 11,
    },
  ];

  /** Monta e baixa um CSV com os dados exibidos na tabela. */
  exportarCsv(): void {
    console.log(this.athletes());
    const headers = this.columns.map((c) => c.header);
    const rows = this.athletes().map((athlete) => [
      athlete.position,
      athlete.name,
      ...athlete.modalityPoints.map((mp) => mp.points),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(';'))
      .join('\n');

    const BOM = '\uFEFF';

    const blob = new Blob([BOM + csvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resultados-decathlon.csv';
    link.click();
    URL.revokeObjectURL(url);
  }
}
