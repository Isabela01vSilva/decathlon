import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-profile-header',
  imports: [  ],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.css',
})
export class ProfileHeader {
  profileImage: string | null = null;
  initials = 'IS';
  name = 'Isabela Silva';
  title = 'Desenvolvedor Front-end Jr';
}
