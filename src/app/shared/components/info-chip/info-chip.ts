import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-chip',
  imports: [],
  templateUrl: './info-chip.html',
  styleUrl: './info-chip.css',
})
export class InfoChip {
  @Input() icon!: string;
  @Input() label!: string;
}
