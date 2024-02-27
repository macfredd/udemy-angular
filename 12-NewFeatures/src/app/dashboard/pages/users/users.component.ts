import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '@services/users.service';
import { TitlesComponent } from '@shared/titles/titles.component';

@Component({
  standalone: true,
  imports: [CommonModule, TitlesComponent, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  public userService = inject(UsersService);

}
