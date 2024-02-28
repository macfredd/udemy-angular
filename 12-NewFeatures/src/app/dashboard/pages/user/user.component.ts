import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@services/users.service';
import { TitlesComponent } from '@shared/titles/titles.component';
import { User } from '../../../interfaces/req-resp';
import { toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, TitlesComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  private route = inject(ActivatedRoute);

  public userService = inject(UsersService);

  public user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.userService.getUserById(id))
    )
  );
  
  public fullName = computed(() => {
    if (this.user()) {
      return "Información del Usuario " + 
              this.user()!.first_name + ' ' + this.user()!.last_name;
    } else {
      return "Información del Usuario...";
    }
  })
}
