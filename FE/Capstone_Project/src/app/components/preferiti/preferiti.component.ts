import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/models/utente.interface';
import { UtenteService } from 'src/app/services/utente.service';
import { StorageService } from 'src/app/auth/storage.service';
import { Annuncio } from 'src/app/models/annuncio.interface';

@Component({
    selector: 'app-preferiti',
    templateUrl: './preferiti.component.html',
    styleUrls: ['./preferiti.component.scss']
})
export class PreferitiComponent implements OnInit {

    utenteLoggato: Utente | undefined;
    preferitiUtente: Annuncio[] | undefined;

    annuncioEsistente: Annuncio | undefined;

    constructor(private usrv: UtenteService, private ssrv: StorageService) { }

    ngOnInit(): void {
        this.getUtente();
    }

    // Funzione che ritorna l'utente loggato e i preferiti
    getUtente(): void {
        let userId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(userId).subscribe(resp => {
            this.utenteLoggato = resp;
            this.preferitiUtente = this.utenteLoggato.preferiti;
        });
    }

    // Funzione che mostra l'alert
    mostraAlert(titolo: string, descrizione: string) {
        alert(titolo + '\n\n' + descrizione);
    }

    // Funzione per la rimossione di un annuncio dalla lista dei preferiti
    rimuoviPreferiti(annuncio: Annuncio): void {
        console.log(annuncio);
        let utenteLoggatoId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(utenteLoggatoId).subscribe(resp => {
            let utente: Utente = resp;
            this.annuncioEsistente = utente.preferiti.find(a => a.id === annuncio.id);
            if (this.annuncioEsistente) {
                utente.preferiti = utente.preferiti.filter(a => a.id !== annuncio.id);
                this.usrv.updateUtente(utente, utenteLoggatoId).subscribe(resp => {
                    console.log(resp);
                    this.getUtente();
                });
            }
            annuncio.preferito = false;
        });
    }

    // Funzione per l'aggiunta di un annuncio alla lista dei preferiti
    aggiungiPreferiti(annuncio: Annuncio): void {
        console.log(annuncio);
        let utenteLoggatoId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(utenteLoggatoId).subscribe(resp => {
            let utente: Utente = resp;
            this.annuncioEsistente = utente.preferiti.find(a => a.id === annuncio.id);
            if (this.annuncioEsistente) {
                this.rimuoviPreferiti(annuncio);
                this.mostraAlert("Annuncio rimosso dai preferiti", "Hai appena rimosso questo annuncio dai tuoi preferiti, premi ok per procedere all'operazione");
                return;
            } else {
                utente.preferiti.push(annuncio);
                this.usrv.updateUtente(utente, utenteLoggatoId).subscribe(resp => {
                    console.log(resp);
                });
                annuncio.preferito = true;
            }
        });
    }

}
