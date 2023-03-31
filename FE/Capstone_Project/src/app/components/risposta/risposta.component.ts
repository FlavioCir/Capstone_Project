import { Component, OnInit } from '@angular/core';
import { MessaggioService } from 'src/app/services/messaggio.service';
import { StorageService } from 'src/app/auth/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Utente } from 'src/app/models/utente.interface';
import { UtenteService } from 'src/app/services/utente.service';
import { Annuncio } from 'src/app/models/annuncio.interface';
import { AnnuncioService } from 'src/app/services/annuncio.service';

import { NgToastService } from 'ng-angular-popup';
import { Messaggio } from 'src/app/models/messaggio.interface';

@Component({
    selector: 'app-risposta',
    templateUrl: './risposta.component.html',
    styleUrls: ['./risposta.component.scss']
})
export class RispostaComponent implements OnInit {

    concessionarioLoggato: Utente | undefined;
    notifica: Messaggio | undefined;

    constructor(private msrv: MessaggioService, private ssrv: StorageService, private router: Router, private ar: ActivatedRoute, private usrv: UtenteService, private asrv: AnnuncioService, private toast: NgToastService) { }

    ngOnInit(): void {
        this.getConcessionarioLoggato();
        this.getNotifica();
    }

    getConcessionarioLoggato(): void {
        let utenteLoggatoId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(utenteLoggatoId).subscribe(resp => {
            this.concessionarioLoggato = resp;
        });
    }

    getNotifica(): void {
        let notificaId = this.ar.snapshot.params["id"];
        this.msrv.getMessaggioById(notificaId).subscribe(resp => {
            this.notifica = resp;
        });
    }

    rispondiAdmin(): void {
        const messaggioInput = document.getElementById('messaggio') as HTMLTextAreaElement;

        const messaggio = messaggioInput.value;

        let data = {
            messaggio: messaggio,
            annuncio: this.notifica?.annuncio,
            utente: this.notifica?.utente,
            concessionario: this.concessionarioLoggato
        }
        try {
            this.msrv.addMessaggio(data).subscribe(resp => {
                console.log(resp);
                this.toast.success({ detail: "Invio risposta!", summary: "Risposta inviata correttamente", duration: 5000 });
                messaggioInput.value = '';
            });
        } catch (error) {
            console.error(error);
        }
    }

    rispondiUtente(): void {
        const messaggioInput = document.getElementById('messaggio') as HTMLTextAreaElement;

        const messaggio = messaggioInput.value;

        let data = {
            messaggio: messaggio,
            annuncio: this.notifica?.annuncio,
            utente: this.notifica?.utente
        }
        try {
            this.msrv.addMessaggio(data).subscribe(resp => {
                console.log(resp);
                this.toast.success({ detail: "Invio risposta!", summary: "Risposta inviata correttamente", duration: 5000 });
                messaggioInput.value = '';
            });
        } catch (error) {
            console.error(error);
        }
    }

    // Controllo se l'utente loggato è admin
    isAdmin(): boolean {
        return this.ssrv.isAdmin();
    }

}
