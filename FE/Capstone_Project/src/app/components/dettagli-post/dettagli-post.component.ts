import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { Annuncio } from 'src/app/models/annuncio.interface';
import { AnnuncioService } from 'src/app/services/annuncio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dettagli-post',
    templateUrl: './dettagli-post.component.html',
    styleUrls: ['./dettagli-post.component.scss']
})
export class DettagliPostComponent implements OnInit {

    annuncio: Annuncio | undefined;

    constructor(private ssrv: StorageService, private asrv: AnnuncioService, private ar: ActivatedRoute) { }

    ngOnInit(): void {
        let x = this.ar.snapshot.params["id"];
        this.asrv.getAnnuncioById(x).subscribe(resp => {
            this.annuncio = resp;
            console.log(resp);
        });
    }

    isAdmin(): boolean {
        return this.ssrv.isAdmin();
    }

}
