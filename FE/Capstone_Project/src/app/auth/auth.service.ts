import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'http://localhost:8080/auth/login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: {username: string, password: string}): Observable<any> {
    return this.http.post(
      url,
      data,
      httpOptions
    );
  }

  registerUser(data: {nome: string, cognome: string, username: string, password: string, email: string}): Observable<any> {
    return this.http.post(
      'http://localhost:8080/registrazioneUtente',
      data,
      httpOptions
    );
  }

  registerConcessionario(data: {ragioneSociale: string, partitaIva: string, indirizzo: String, cap: string, localita: string, telefono: string, username: string, password: string, email: string}): Observable<any> {
    return this.http.post(
      'http://localhost:8080/registrazioneConcessionario',
      data,
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(url + 'singout', { }, httpOptions);
  }

}
