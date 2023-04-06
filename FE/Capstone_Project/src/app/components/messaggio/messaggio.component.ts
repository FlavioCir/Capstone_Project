import { Component, OnInit } from '@angular/core';
import { MessaggioService } from 'src/app/services/messaggio.service';
import { StorageService } from 'src/app/auth/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Utente } from 'src/app/models/utente.interface';
import { UtenteService } from 'src/app/services/utente.service';
import { AnnuncioService } from 'src/app/services/annuncio.service';
import { Annuncio } from 'src/app/models/annuncio.interface';

import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-messaggio',
    templateUrl: './messaggio.component.html',
    styleUrls: ['./messaggio.component.scss']
})
export class MessaggioComponent implements OnInit {

    utenteLoggato: Utente | undefined;
    annuncio: Annuncio | undefined;

    data: string | undefined;
    ora: string | undefined;

    constructor(private msrv: MessaggioService, private ssrv: StorageService, private router: Router, private ar: ActivatedRoute, private usrv: UtenteService, private asrv: AnnuncioService, private toast: NgToastService) { }

    ngOnInit(): void {
        this.getUtenteLoggato();
        this.getAnnuncio();
        this.getDataOra();
    }

    getUtenteLoggato(): void {
        let utenteLoggatoId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(utenteLoggatoId).subscribe(resp => {
            this.utenteLoggato = resp;
        });
    }

    getAnnuncio(): void {
        let annuncioId = this.ar.snapshot.params["id"];
        this.asrv.getAnnuncioById(annuncioId).subscribe(resp => {
            this.annuncio = resp
        });
    }

    //Funzione per postare un messaggio
    contattaVenditore(): void {
        const messaggioInput = document.getElementById('messaggio') as HTMLTextAreaElement;

        const messaggio = messaggioInput.value;

        if(messaggio === "") {
            messaggioInput.style.border = "3px solid red";

            this.toast.error({ detail: "Errore!", summary: "Scrivi un messaggio prima di inviarlo", duration: 5000 });
        } else {
            let data = {
                messaggio: messaggio,
                data: this.data,
                ora: this.ora,
                annuncio: this.annuncio,
                utente: this.utenteLoggato
            }
            try {
                this.msrv.addMessaggio(data).subscribe(resp => {
                    console.log(resp);
                    this.toast.success({ detail: "Invio messaggio!", summary: "Messaggio inviato correttamente", duration: 5000 });
                    messaggioInput.value = '';
                });
            } catch (error) {
                console.error(error);
            }
        }

    }

    getDataOra(): void {
        const data: Date = new Date();
        let giorno: number = data.getDate();
        let mese: number = data.getMonth() + 1;
        let anno: number = data.getFullYear();

        let ora: number = data.getHours();
        let minuti: number = data.getMinutes();

        this.data = `${giorno}/${mese}/${anno}`;
        if(minuti < 10) {
            this.ora = `${ora}:0${minuti}`;
        } else {
            this.ora = `${ora}:${minuti}`;
        }
    }

}
