import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heros.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {
    constructor(private httpClient: HttpClient) { }

    private baseUrl: string = environments.baseUrl;
    
    getHeroes(): Observable<Heroe[]> {
        return this.httpClient.get<Heroe[]>(`${this.baseUrl}/heroes`);
    }

}