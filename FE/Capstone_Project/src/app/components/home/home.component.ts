import { Component, OnInit } from '@angular/core';
import { Annuncio } from 'src/app/models/annuncio.interface';
import { AnnuncioService } from 'src/app/services/annuncio.service';
import { StorageService } from 'src/app/auth/storage.service';
import { UtenteService } from 'src/app/services/utente.service';
import { Utente } from 'src/app/models/utente.interface';
import { Router } from '@angular/router';

import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    annunci: Annuncio[] | undefined;
    preferiti: any;
    utenteLoggato: Utente | undefined;
    annuncioEsistente: Annuncio | undefined;

    isLoggedIn = false;
    roles: string[] = [];

    searchMarca: string = "";
    searchModello: string = "";
    searchMinAnno: string = "";
    searchMaxAnno: string = "";
    searchMinKilometri: string = "";
    searchMaxKilometri: string = "";
    searchPrezzo: string = "";

    constructor(private asrv: AnnuncioService, private ssrv: StorageService, private usrv: UtenteService, private router: Router, private toast: NgToastService) { }

    ngOnInit(): void {
        if (this.ssrv.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.ssrv.getUser().roles;
            this.getAnnunciPreferiti();
        }
        this.getAnnuncio();
    }

    // Funzione per il recupero degli annunci presenti nella lista dei preferiti dell'utente loggato
    getAnnunciPreferiti(): void {
        let utenteLoggatoId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(utenteLoggatoId).subscribe(resp => {
            this.utenteLoggato = resp;
            this.preferiti = this.utenteLoggato.preferiti.map(a => a.id);
            if (this.annunci) {
                this.annunci.forEach(a => {
                    if (this.preferiti.includes(a.id)) {
                        a.preferito = true;
                    }
                });
            }
        });
    }

    // Funzione per il recupero di tutti gli annunci
    getAnnuncio(): void {
        this.asrv.getAnnuncio().subscribe(resp => {
            this.annunci = resp;
            console.log(resp);
        });
        this.getAnnunciPreferiti();
    }

    // Funzione per vedere se l'utente loggato è admin
    isAdmin(): boolean {
        return this.ssrv.isAdmin();
    }

    // Funzione per la rimozione dell'annuncio dalla lista dei preferiti
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
                });
            }
            this.toast.warning({detail: "Annungio rimosso dai preferiti", summary: "Annuncio rimosso dalla lista dei preferiti!", duration: 5000});
            annuncio.preferito = false;
        });
    }

    // Funzione per l'aggiunta di un annuncio alla lista dei preferiti
    aggiungiPreferiti(annuncio: Annuncio): void {
        if (!this.ssrv.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        } else {
            console.log(annuncio);
            let utenteLoggatoId = this.ssrv.getUser().id;
            this.usrv.getUtenteById(utenteLoggatoId).subscribe(resp => {
                let utente: Utente = resp;
                this.annuncioEsistente = utente.preferiti.find(a => a.id === annuncio.id);
                if (this.annuncioEsistente) {
                    this.rimuoviPreferiti(annuncio);
                    return;
                } else {
                    utente.preferiti.push(annuncio);
                    this.usrv.updateUtente(utente, utenteLoggatoId).subscribe(resp => {
                        console.log(resp);
                    });
                    this.toast.success({detail: "Annungio aggiunto ai preferiti", summary: "Ottima scelta!", duration: 5000});
                    annuncio.preferito = true;
                }
            });
        }
    }

    // ------------------------- FILTRI PER: -------------------------

    // MARCA
    getAnnuncioPerMarca(): void {
        const marcaInput = document.getElementById('marca') as HTMLInputElement;

        const marca = marcaInput.value;

        if(marca) {
            this.asrv.getAnnuncioPerMarca(marca).subscribe(resp => {
                this.annunci = [];
                this.annunci = resp
            });
        } else {
            this.getAnnuncio();
        }
    }

    // MODELLO
    getAnnuncioPerModello(): void {
        const modelloInput = document.getElementById('modello') as HTMLInputElement;

        const modello = modelloInput.value;

        if(modello) {
            this.asrv.getAnnuncioPerModello(modello).subscribe(resp => {
                this.annunci = [];
                this.annunci = resp
            });
        } else {
            this.getAnnuncio();
        }
    }

    // ANNO D'IMMATRICOLAZIONE
    getAnnuncioPerImmatricolazione(): void {
        const annoMinInput = document.getElementById('minAnno') as HTMLInputElement;
        const annoMaxInput = document.getElementById('maxAnno') as HTMLInputElement;

        const annoMin = annoMinInput.value;
        const annoMax = annoMaxInput.value;

        if(annoMin && annoMax) {
            this.asrv.getAnnuncioPerImmatricolazione(annoMin, annoMax).subscribe(resp => {
                this.annunci = [];
                this.annunci = resp;
            });
        } else {
            this.getAnnuncio();
        }
    }

    // KILOMETRI
    getAnnuncioPerKilometri(): void {
        const kilometriMinInput = document.getElementById('minKilometri') as HTMLInputElement;
        const kilometriMaxInput = document.getElementById('maxKilometri') as HTMLInputElement;

        const kilometriMin = parseInt(kilometriMinInput.value);
        const kilometriMax = parseInt(kilometriMaxInput.value);

        if(kilometriMin && kilometriMax) {
            this.asrv.getAnnuncioPerKilometri(kilometriMin, kilometriMax).subscribe(resp => {
                this.annunci = [];
                this.annunci = resp;
            });
        } else {
            this.getAnnuncio();
        }
    }

    // PREZZO
    getAnnuncioPerPrezzo(): void {
        const prezzoInput = document.getElementById('prezzo') as HTMLInputElement;

        const prezzo = parseInt(prezzoInput.value);

        if(prezzo) {
            this.asrv.getAnnuncioPerPrezzo(prezzo).subscribe(resp => {
                this.annunci = [];
                this.annunci = resp;
            });
        } else {
            this.getAnnuncio();
        }
    }

    // Funzione associata al bottone RESET che cancella il testo dentro gli input e ritorna tutti gli annunci
    reset(): void {
        this.searchMarca = '';
        this.searchModello = '';
        this.searchMinAnno = '';
        this.searchMaxAnno = '';
        this.searchMinKilometri = '';
        this.searchMaxKilometri = '';
        this.searchPrezzo = '';
        this.getAnnuncio();
    }

}
