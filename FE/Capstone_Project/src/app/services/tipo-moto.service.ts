import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoMoto } from '../models/tipo-moto.interface';

@Injectable({
    providedIn: 'root'
})
export class TipoMotoService {

    constructor(private http: HttpClient) { }

    getTipoMoto(): Observable<TipoMoto[]> {
        return this.http.get<TipoMoto[]>('http://localhost:8080/tipo_moto');
    }

    getTipoMotoById(id: number): Observable<TipoMoto> {
        return this.http.get<TipoMoto>(`http://localhost:8080/tipo_moto/${id}`);
    }

    deleteTipoMoto(id: number): Observable<Object> {
        return this.http.delete(`http://localhost:8080/tipo_moto/${id}`);
    }

    addTipoMoto(tipoMoto: any): Observable<Object> {
        return this.http.post('http://localhost:8080/tipo_moto', tipoMoto);
    }

    updateTipoMoto(tipoMoto: any, id: number): Observable<Object> {
        return this.http.put(`http://localhost:8080/tipo_moto/${id}`, tipoMoto);
    }

}
