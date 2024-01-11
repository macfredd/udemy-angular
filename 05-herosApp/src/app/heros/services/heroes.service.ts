import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Heroe } from '../interfaces/heros.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {
    constructor(private httpClient: HttpClient) { }

    private baseUrl: string = environments.baseUrl;
    
    getHeroes(): Observable<Heroe[]> {
        return this.httpClient.get<Heroe[]>(`${this.baseUrl}/heroes`);
    }

    getHeroeById(id: string): Observable<Heroe | undefined> {
        return this.httpClient.get<Heroe>(`${this.baseUrl}/heroes/${id}`)
        .pipe(catchError(err => of(undefined)));
    }

    getSuggestions(term: string): Observable<Heroe[]> {
        return this.httpClient.get<Heroe[]>(`${this.baseUrl}/heroes?q=${term}&_limit=6`);
    }

    addHeroe(heroe: Heroe): Observable<Heroe> {
        return this.httpClient.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
    }

    updateHeroe(heroe: Heroe) : Observable<Heroe> {
        if (!heroe.id) throw new Error('Hero id is requierd to Update');
        return this.httpClient.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
    }

    deleteHeroe(id: string): Observable<boolean> {
        return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`)
        .pipe(
            catchError(err => of(false)),
            map(resp => true));
    }
}