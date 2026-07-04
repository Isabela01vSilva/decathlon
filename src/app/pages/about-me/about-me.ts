import { Component } from '@angular/core';
import { ProfileHeader } from "./components/profile-header/profile-header";
import { InfoChip } from "@shared/components/info-chip/info-chip";
import { ContactLink } from "./components/contact-link/contact-link";

@Component({
  selector: 'app-about-me',
  imports: [ProfileHeader, InfoChip, ContactLink],
  templateUrl: './about-me.html',
  styleUrl: './about-me.css',
})
export class AboutMe {}
