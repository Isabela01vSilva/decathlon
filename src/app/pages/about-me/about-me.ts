import { Component } from '@angular/core';
import { ProfileHeader } from "./components/profile-header/profile-header";
import { InfoChip } from "@shared/components/info-chip/info-chip";
import { ContactLink } from "./components/contact-link/contact-link";
import { ProjectCard } from "@shared/components/project-card/project-card";

@Component({
  selector: 'app-about-me',
  imports: [ProfileHeader, InfoChip, ContactLink, ProjectCard],
  templateUrl: './about-me.html',
  styleUrl: './about-me.css',
})
export class AboutMe {}
