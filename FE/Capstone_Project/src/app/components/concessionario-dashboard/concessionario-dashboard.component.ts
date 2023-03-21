import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/models/utente.interface';
import { UtenteService } from 'src/app/services/utente.service';
import { StorageService } from 'src/app/auth/storage.service';
import { Annuncio } from 'src/app/models/annuncio.interface';
import { AnnuncioService } from 'src/app/services/annuncio.service';

@Component({
    selector: 'app-concessionario-dashboard',
    templateUrl: './concessionario-dashboard.component.html',
    styleUrls: ['./concessionario-dashboard.component.scss']
})
export class ConcessionarioDashboardComponent implements OnInit {

    concessionarioLoggato: Utente | undefined;
    annunci: Annuncio[] | undefined;

    constructor(private usrv: UtenteService, private ssrv: StorageService, private asrv: AnnuncioService) { }

    ngOnInit(): void {
       this.getConcessionario();
       this.getAnnuncio();
    }

    getConcessionario(): void {
        let userId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(userId).subscribe(resp => {
            this.concessionarioLoggato = resp;
        });
    }

    getAnnuncio(): void {
        const userId = this.ssrv.getUser().id;
        this.asrv.getAnnuncio().subscribe(resp => {
            this.annunci = resp.filter(a => a.utente.id === userId);
        });
    }

    mostraAlert(titolo: string) {
        alert(titolo);
    }

    eliminaAnnuncio(id: number): void {
        this.asrv.deleteAnnuncio(id).subscribe(resp => {
        });
        this.mostraAlert("Annuncio eliminato con successo");
        this.getAnnuncio();
    }

}
