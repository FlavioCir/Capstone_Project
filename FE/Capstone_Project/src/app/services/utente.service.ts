import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utente } from '../models/utente.interface';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

    constructor(private http: HttpClient) { }

    getUtente(): Observable<Utente[]> {
        return this.http.get<Utente[]>('http://localhost:8080/utenti/');
    }

    deleteUtente(id: number): Observable<Object> {
        return this.http.delete(`http://localhost:8080/utenti/${id}`);
    }

    getUtenteById(id: number): Observable<Utente> {
        return this.http.get<Utente>(`http://localhost:8080/utenti/${id}`);
    }

    addUtente(utente: any): Observable<Object> {
        return this.http.post('http://localhost:8080/utenti/', utente);
    }

    updateUtente(utente: any, id: number): Observable<Object> {
        return this.http.put(`http://localhost:8080/utente/${id}`, utente);
    }
}
