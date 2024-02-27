import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UsersService } from '@services/users.service';
import { TitlesComponent } from '@shared/titles/titles.component';

@Component({
  standalone: true,
  imports: [CommonModule, TitlesComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  public userService = inject(UsersService);

}
