import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Annuncio } from '../models/annuncio.interface';

@Injectable({
    providedIn: 'root'
})
export class AnnuncioService {

    constructor(private http: HttpClient) { }

    getAnnuncio(): Observable<Annuncio[]> {
        return this.http.get<Annuncio[]>('http://localhost:8080/annunci');
    }

    deleteAnnuncio(id: number): Observable<Object> {
        return this.http.delete(`http://localhost:8080/annunci/${id}`);
    }

    addAnnunci(annuncio: any): Observable<Object> {
        return this.http.post('http://localhost:8080/annunci', annuncio);
    }

    updateAnnuncio(annuncio: any, id: number): Observable<Object> {
        return this.http.put(`http://localhost:8080/annunci/${id}`, annuncio);
    }

}
