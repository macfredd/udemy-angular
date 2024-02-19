import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { CheckTokenReponse, LoginResponse, User, TokenExpired } from '../interfaces/';
import { AuthStatus } from '../enums/auth-status.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.baseUrl;
  
  private httpClient: HttpClient = inject(HttpClient);
  private readonly router = inject(Router);


  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.CHECKING);
  // No exponemos el current User directamente, sino que lo exponemos a través de una propiedad computada
  public currentUser = computed(() => this._currentUser());
  // No exponemos el authStatus directamente
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuth().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.AUTHENTICATED);
    localStorage.setItem('token', token);
    return true;
  }

  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.httpClient.post<LoginResponse>(url, body)
    .pipe(
      map(({token, user}) => {
        return this.setAuthentication(user, token);
      }),
      catchError((err) => {
        return throwError(() => err.error.message);
      })
    );
  }

  checkAuth(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<CheckTokenReponse>(url, { headers: header })
    .pipe( 
      map(({token, user}) => {
        return this.setAuthentication(user, token);
      }),
      catchError((err) => {
        
        if (401 === err.status) {
          this._currentUser.set(null);
          this._authStatus.set(AuthStatus.UNAUTHENTICATED);
          localStorage.removeItem('token');
          this.router.navigate(['/auth/login']);
        }
        return of(false);
      })
    );
  }
}
