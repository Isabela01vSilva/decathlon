import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AthleteResult, ColumnDef } from '@models/athlete-result.model';
import { ResultsService } from '@service/results.service';

@Component({
  selector: 'app-results-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './results-table.html',
  styleUrls: ['./results-table.css'],
})
export class ResultsTableComponent implements OnInit {
  @Input() results: AthleteResult[] = [];

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

  ngOnInit(): void {
    console.log(this.athletes());
  }

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
