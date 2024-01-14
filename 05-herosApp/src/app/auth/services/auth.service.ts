import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl: string = environments.baseUrl;

    private user?: User;

    constructor(private httpClient: HttpClient) { }

    get currentUser() : User | undefined {
        console.log(this.user);
        if (!this.user) return undefined;

        return structuredClone(this.user);
    }

    login( email: string, password: string): Observable<User> {
        
        return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            tap(user => this.user = user),
            tap(user => localStorage.setItem('token', user.id.toString()),
            )
        );
    }

    logout(): Observable<boolean> {
        this.user = undefined;
        localStorage.clear();
        return of(true);
    }
}