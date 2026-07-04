import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-link',
  imports: [],
  templateUrl: './contact-link.html',
  styleUrl: './contact-link.css',
})
export class ContactLink {
  @Input() icon!: string;
  @Input() label!: string;
  @Input() url: string =  '';
}
