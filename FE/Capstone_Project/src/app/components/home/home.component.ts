import { Component, OnInit } from '@angular/core';
import { Annuncio } from 'src/app/models/annuncio.interface';
import { AnnuncioService } from 'src/app/services/annuncio.service';
import { StorageService } from 'src/app/auth/storage.service';
import { UtenteService } from 'src/app/services/utente.service';
import { Utente } from 'src/app/models/utente.interface';
import { Router } from '@angular/router';

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

    constructor(private asrv: AnnuncioService, private ssrv: StorageService, private usrv: UtenteService, private router: Router) { }

    ngOnInit(): void {
        if (this.ssrv.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.ssrv.getUser().roles;
        }
        this.getAnnuncio();
        this.getAnnunciPreferiti();
    }

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

    getAnnuncio(): void {
        this.asrv.getAnnuncio().subscribe(resp => {
            this.annunci = resp;
            console.log(resp);
        });
        this.getAnnunciPreferiti();
    }

    isAdmin(): boolean {
        return this.ssrv.isAdmin();
    }

    mostraAlert(titolo: string, descrizione: string) {
        alert(titolo + '\n\n' + descrizione);
    }

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
            annuncio.preferito = false;
        });
    }

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
                    this.mostraAlert("Annuncio rimosso dai preferiti", "Hai appena rimosso l'annuncio dai preferiti, premi ok per procedere all'operazione");
                    return;
                } else {
                    utente.preferiti.push(annuncio);
                    this.usrv.updateUtente(utente, utenteLoggatoId).subscribe(resp => {
                        console.log(resp);
                    });
                    annuncio.preferito = true;
                    this.mostraAlert("Annuncio aggiunto ai preferiti", "Hai appena aggiunto questo annuncio ai preferiti. Puoi visualizzare tutti gli annunci a cui hai messo mi piace entrando del tuo profilo!");
                }
            });
        }
    }

    // FILTRI ----------------------------------------------------------------

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

}
