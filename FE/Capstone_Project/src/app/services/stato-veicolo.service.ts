import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { StatoVeicolo } from '../models/stato-veicolo.interface';

@Injectable({
    providedIn: 'root'
})
export class StatoVeicoloService {

    constructor(private http: HttpClient) { }

    getStatoVeicolo(): Observable<StatoVeicolo[]> {
        return this.http.get<StatoVeicolo[]>('http://localhost:8080/stato_veicolo');
    }

    getStatoVeicoloById(id: number): Observable<StatoVeicolo> {
        return this.http.get<StatoVeicolo>(`http://localhost:8080/stato_veicolo/${id}`);
    }

    deleteStatoVeicolo(id: number): Observable<Object> {
        return this.http.delete(`http://localhost:8080/stato_veicolo/${id}`);
    }

    addStatoVeicolo(statoVeicolo: any): Observable<Object> {
        return this.http.post('http://localhost:8080/stato_veicolo', statoVeicolo);
    }

    updateStatoVeicolo(statoVeicolo: any, id: number): Observable<Object> {
        return this.http.put(`http://localhost:8080/stato_veicolo/${id}`, statoVeicolo);
    }

}
