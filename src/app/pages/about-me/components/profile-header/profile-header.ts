import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-profile-header',
  imports: [ AvatarModule ],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.css',
})
export class ProfileHeader {
  profileImage: string = 'assets/images/profile-photo.jpg';
  initials = 'IS';
  name = 'Isabela Silva';
  title = 'Desenvolvedor Front-end Jr';
}
