import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Messaggio } from '../models/messaggio.interface';

@Injectable({
    providedIn: 'root'
})
export class MessaggioService {

    constructor(private http: HttpClient) { }

    getMessaggio(): Observable<Messaggio[]> {
        return this.http.get<Messaggio[]>('http://localhost:8080/messaggi');
    }

    getMessaggioById(id: number): Observable<Messaggio> {
        return this.http.get<Messaggio>(`http://localhost:8080/messaggi/${id}`);
    }

    deleteMessaggio(id: number): Observable<Object> {
        return this.http.delete(`http://localhost:8080/messaggi/${id}`);
    }

    addMessaggio(messaggio: any): Observable<Messaggio> {
        return this.http.post<Messaggio>('http://localhost:8080/messaggi', messaggio);
    }

    updateMessaggio(messaggio: any, id: number): Observable<Object> {
        return this.http.put(`http://localhost:8080/messaggi/${id}`, messaggio);
    }

}
