import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { SingleUserResponse, User } from '../../interfaces/user-request.interface';
import { Observable, map } from 'rxjs';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit{
  

  private userService = inject(UserServiceService);

  public userId = signal<number>(1);
  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal<boolean>(true);

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number) {
    if (id < 1) {
      this.userWasFound.update(() => false);
      return;
    }

    this.currentUser.update(() => undefined);

    this.userId.set(id);

    this.userService.getUserById(id)
    .subscribe(
      user => {
        this.currentUser.set(user);
        this.userWasFound.set(true);
      }
    );
  }

  
}
