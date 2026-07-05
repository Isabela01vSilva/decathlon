import { Component } from '@angular/core';
import { ResultsTable } from "./results-table/results-table";

@Component({
  selector: 'app-results',
  imports: [ResultsTable],
  templateUrl: './results.html',
  styleUrl: './results.css',
})
export class Results {

  /** Monta e baixa um CSV com os dados exibidos na tabela. */
  exportarCsv(): void {
    const headers = ['Posição', ...RESULT_COLUMNS.map((c) => c.header)];
    const rows = this.results.map((athlete) => [
      athlete.posicao,
      athlete.nome,
      ...RESULT_COLUMNS.slice(1).map((c) => athlete[c.field]),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resultados-decatlo.csv';
    link.click();
    URL.revokeObjectURL(url);
  }
}
