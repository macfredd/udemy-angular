import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { LoginResponse, User } from '../interfaces/';
import { AuthStatus } from '../enums/auth-status.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.baseUrl;
  private httpClient: HttpClient = inject(HttpClient);
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.CHEKING);
  // No exponemos el current User directamente, sino que lo exponemos a través de una propiedad computada
  public currentUser = computed(() => this._currentUser);
  // No exponemos el authStatus directamente
  public authStatus = computed(() => this._authStatus);

  constructor() { }

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.httpClient.post<LoginResponse>(url, body)
    .pipe(
      tap(({user, token}) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.AUTHENTICATED);
        localStorage.setItem('token', token);
      }),
      map(() => true),
      catchError((err) => {
        return throwError(() => err.error.message);
      })
    );
  }
}
