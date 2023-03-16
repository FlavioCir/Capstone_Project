import { Component, OnInit } from '@angular/core';
import { Annuncio } from 'src/app/models/annuncio.interface';
import { AnnuncioService } from 'src/app/services/annuncio.service';
import { UtenteService } from 'src/app/services/utente.service';
import { StorageService } from 'src/app/auth/storage.service';

@Component({
    selector: 'app-annuncio-card',
    templateUrl: './annuncio-card.component.html',
    styleUrls: ['./annuncio-card.component.scss']
})
export class AnnuncioCardComponent implements OnInit {

    annunci: Annuncio[] | undefined;

    constructor(private asrv: AnnuncioService, private usrv: UtenteService, private ssrv: StorageService) { }

    ngOnInit(): void {
        this.getAnnuncio();
    }

    getAnnuncio(): void {
        const userId = this.ssrv.getUser().id;
        this.asrv.getAnnuncio().subscribe(resp => {
            this.annunci = resp.filter(a => a.utente.id === userId);
        });
    }

}
