import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ColumnDef } from '@core/models/athlete-result.model';
import { ResultsService } from '@service/results.service';

@Component({
  selector: 'app-results-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './results-table.html',
  styleUrls: ['./results-table.css'],
})
export class ResultsTableComponent {
  private readonly resultsService: ResultsService = inject(ResultsService);

  athletes = this.resultsService.athletes;
  @Input() columns!: ColumnDef[];

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
}
