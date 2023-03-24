import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { StorageService } from 'src/app/auth/storage.service';
import { Utente } from 'src/app/models/utente.interface';
import { UtenteService } from 'src/app/services/utente.service';

import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-modifica-utente-oconcessionario',
    templateUrl: './modifica-utente-oconcessionario.component.html',
    styleUrls: ['./modifica-utente-oconcessionario.component.scss']
})
export class ModificaUtenteOConcessionarioComponent implements OnInit {

    utenteLoggato: Utente | undefined;

    isLoggedIn = false;
    roles: string[] = [];

    constructor(private asrv: AuthService, private router: Router, private ssrv: StorageService, private usrv: UtenteService, private toast: NgToastService) { }

    ngOnInit(): void {
        this.getUtente();
        if (this.ssrv.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.ssrv.getUser().roles;
        }
    }

    async edit(form: NgForm) {
        let utenteLoggatoId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(utenteLoggatoId).subscribe(resp => {
            this.utenteLoggato = resp;
        })
        let data = {
            ragioneSociale: form.value.ragioneSociale,
            partitaIva: form.value.partitaIva,
            indirizzo: form.value.indirizzo,
            cap: form.value.cap,
            localita: form.value.localita,
            telefono: form.value.telefono,

            nome: form.value.nome,
            cognome: form.value.cognome,

            username: form.value.username,
            email: form.value.email,
            password: this.utenteLoggato?.password
        }
        try {
            this.usrv.updateUtente(data, utenteLoggatoId).subscribe({
                next: data => {
                    console.log(data);
                    this.router.navigate(['/']);
                    this.toast.info({detail: "Se hai modificato l'username", summary: "Ricordati di effettuare di nuovo il login", duration: 5000});
                }
            });
        } catch (error) {
            console.error(error)
        }
    }

    isAdmin(): boolean {
        return this.ssrv.isAdmin();
    }

    getUtente(): void {
        let utenteLoggatoId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(utenteLoggatoId).subscribe(resp => {
            this.utenteLoggato = resp;
            console.log(this.utenteLoggato);
        });
    }

    logout(): void {
        window.sessionStorage.removeItem('auth-user');
        this.isLoggedIn = false;
        this.router.navigate(['/']);
    }

}
