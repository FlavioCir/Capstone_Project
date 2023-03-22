import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
    })
};

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(private http: HttpClient) { }

    uploadImage(vals: any): Observable<any> {
        let data = vals;

        return this.http.post('https://api.cloudinary.com/v1_1/do3bktftk/image/upload', data, httpOptions );
    }

}
