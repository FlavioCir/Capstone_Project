import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Foto } from '../models/foto.interface';

@Injectable({
    providedIn: 'root'
})
export class FotoService {

    constructor(private http: HttpClient) { }

    getFoto(): Observable<Foto[]> {
        return this.http.get<Foto[]>('http://localhost:8080/foto');
    }

    getFotoById(id: number): Observable<Foto> {
        return this.http.get<Foto>(`http://localhost:8080/foto/${id}`);
    }

    deleteFoto(id: number): Observable<Object> {
        return this.http.delete(`http://localhost:8080/foto/${id}`);
    }

    addFoto(foto: any): Observable<Object> {
        return this.http.post('http://localhost:8080/foto', foto);
    }

    updateFoto(foto: any, id: number): Observable<Object> {
        return this.http.put(`http://localhost:8080/foto/${id}`, foto);
    }

}
