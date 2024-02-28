import { Injectable, computed, inject, signal } from '@angular/core';
import type { User, UserResponse, UsersResponse } from '../interfaces/req-resp';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs';

interface state {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient);
  #state = signal<state>({
    loading: true,
    users: []
  });

  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);

  constructor() {
    this.httpClient.get<UsersResponse>('https://reqres.in/api/users')
    .pipe(delay(2000))
    .subscribe(res => {
      this.#state.set({
        users: res.data,
        loading: false
      });
    })
  }

  getUserById(id: string) {
    return this.httpClient.get<UserResponse>(`https://reqres.in/api/users/${id}`)
    .pipe(
      delay(2000),
      map( res => res.data) 
    )
  }
}
