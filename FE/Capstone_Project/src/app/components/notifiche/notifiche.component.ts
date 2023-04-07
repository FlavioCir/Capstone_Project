import { Component, OnInit } from '@angular/core';
import { Messaggio } from 'src/app/models/messaggio.interface';
import { Utente } from 'src/app/models/utente.interface';
import { MessaggioService } from 'src/app/services/messaggio.service';
import { UtenteService } from 'src/app/services/utente.service';
import { StorageService } from 'src/app/auth/storage.service';

@Component({
    selector: 'app-notifiche',
    templateUrl: './notifiche.component.html',
    styleUrls: ['./notifiche.component.scss']
})
export class NotificheComponent implements OnInit {

    notificheAdmin: Messaggio[] | undefined;
    notificheUtente: Messaggio[] | undefined;
    utenteLoggato: Utente | undefined;

    constructor(private msrv: MessaggioService, private usrv: UtenteService, private ssrv: StorageService) { }

    ngOnInit(): void {
        if(this.ssrv.isAdmin()) {
            this.getMessaggiAdmin();
        } else {
            this.getMessaggiUtente();
        }
    }

    // Funzione che ritorna l'utente loggato
    getUtenteLoggato(): void {
        let utenteLoggatoId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(utenteLoggatoId).subscribe(resp => {
            this.utenteLoggato = resp
        })
    }

    // Funzione che mi ritorna i messaggi legati al conessionario loggato
    getMessaggiAdmin(): void {
        this.getUtenteLoggato();
        this.notificheAdmin = [];
        this.msrv.getMessaggio().subscribe(resp => {
            this.notificheAdmin = resp.filter(messaggio => messaggio.annuncio.utente.id === this.utenteLoggato?.id && !messaggio.concessionario || messaggio.concessionario.id !== this.utenteLoggato?.id).reverse();
        });
    }

    // Funzione che mi ritorna i messaggi legati all'utente loggato
    getMessaggiUtente(): void {
        this.getUtenteLoggato();
        this.notificheUtente = [];
        this.msrv.getMessaggio().subscribe(resp => {
            this.notificheUtente = resp.filter(messaggio => messaggio.utente.id === this.utenteLoggato?.id && messaggio.concessionario !== null).reverse();
        });
    }

    // Controllo se l'utente loggato è admin
    isAdmin(): boolean {
        return this.ssrv.isAdmin();
    }

}
