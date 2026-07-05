import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AthleteResult, ColumnDef, RESULT_COLUMNS } from '../../models/athlete-result.model';

@Component({
  selector: 'app-results-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './results-table.html',
  styleUrls: ['./results-table.scss'],
})
export class ResultsTableComponent {
  @Input() results: AthleteResult[] = [];

  columns: ColumnDef[] = RESULT_COLUMNS;

  /**
   * Retorna a classe de destaque da linha com base na posição de chegada.
   * As 3 primeiras colocações recebem cores diferentes (ouro, prata, bronze-lavanda),
   * respeitando os empates mostrados no design original.
   */
  rowHighlightClass(rowIndex: number): string {
    switch (rowIndex) {
      case 0:
        return 'row-gold';
      case 1:
        return 'row-silver';
      case 2:
        return 'row-bronze';
      default:
        return '';
    }
  }

  formatNumber(value: number): string {
    return value.toFixed(2);
  }
}
