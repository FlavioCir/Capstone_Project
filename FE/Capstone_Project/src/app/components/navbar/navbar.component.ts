import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';
import { MessaggioService } from 'src/app/services/messaggio.service';
import { UtenteService } from 'src/app/services/utente.service';
import { Utente } from 'src/app/models/utente.interface';
import { Messaggio } from 'src/app/models/messaggio.interface';
import { filter } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    nome: string | undefined;
    cognome: string | undefined;
    ragioneSociale: string | undefined;

    utenteLoggato: Utente | undefined;
    notificheAdmin: Messaggio[] | undefined;
    notificheUtente: Messaggio[] | undefined;

    numNotifiche = 0;

    constructor(private router: Router, private storagesrv: StorageService, private usrv: UtenteService, private msrv: MessaggioService) { }

    ngOnInit(): void {
        if (this.storagesrv.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.storagesrv.getUser().roles;
            this.getUser();
            this.getAdmin();
        }
    }

    // Funzione che associa alla variabile nome e cognome il nome e cognome dell'utente loggato
    getUser(): void {
        const user = this.storagesrv.getUser();
        if (user && user.id) {
            this.nome = user.nome;
            this.cognome = user.cognome;
            this.getUtenteLoggato();
        }
    }

    // Funzione che associa alla vairbile ragioneSociale, la ragioneSociale dell'utente loggato
    getAdmin(): void {
        const user = this.storagesrv.getUser();
        if (user && user.id) {
            this.ragioneSociale = user.ragioneSociale;
            this.getUtenteLoggato();
        }
    }

    // Controllo se è admin
    isAdmin(): boolean {
        return this.storagesrv.isAdmin();
    }

    // Funzione di logout
    logout(): void {
        window.sessionStorage.removeItem('auth-user');
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    }

    getUtenteLoggato(): void {
        let utenteLoggatId = this.storagesrv.getUser().id;
        this.usrv.getUtenteById(utenteLoggatId).subscribe(resp => {
            this.utenteLoggato = resp;
            this.getMessaggi();
        });
    }

    // Funzione che mi ritorna i messaggi
    getMessaggi(): void {
        if(this.isAdmin()) {
            this.notificheAdmin = [];
        } else {
            this.notificheUtente = [];
        }

        this.msrv.getMessaggio().subscribe(resp => {
            if(resp.length > 0) {
                if(this.isAdmin()) {
                    this.notificheAdmin = resp.filter(messaggio => messaggio.annuncio.utente.id === this.utenteLoggato?.id && !messaggio.concessionario || messaggio.concessionario.id !== this.utenteLoggato?.id);
                } else {
                    this.notificheUtente = resp.filter(messaggio => messaggio.utente.id === this.utenteLoggato?.id && messaggio.concessionario !== null);
                }
            } else {
                console.log("Non ci sono messaggi");
            }
        }, error => {
            console.log("Error", error);
        });
    }

}
