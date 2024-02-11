import { HttpClient } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { SingleUserResponse, User } from '../../interfaces/user-request.interface';
import { Observable, catchError, map, of } from 'rxjs';
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
  
  public fullName = computed<string>(() => { 
    return this.currentUser()?.first_name + 
      ' '
      + this.currentUser()?.last_name});
  
  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id: number) {
    if (id < 1) {
      this.currentUser.update(() => undefined);
      this.userWasFound.update(() => false);
      return;
    }

    this.userId.set(id);
    this.currentUser.update(() => undefined);

    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.currentUser.update(() => user);
        this.userWasFound.update(() => true);
      },
      error: (err) => {
        this.userWasFound.update(() => false);
        this.currentUser.update(() => undefined);
      }
    })
  }
}
