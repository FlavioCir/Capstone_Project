import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { StorageService } from 'src/app/auth/storage.service';
import { Utente } from 'src/app/models/utente.interface';
import { UtenteService } from 'src/app/services/utente.service';

@Component({
    selector: 'app-modifica-utente-oconcessionario',
    templateUrl: './modifica-utente-oconcessionario.component.html',
    styleUrls: ['./modifica-utente-oconcessionario.component.scss']
})
export class ModificaUtenteOConcessionarioComponent implements OnInit {

    utenteLoggato: Utente | undefined;

    isLoggedIn = false;
    roles: string[] = [];

    constructor(private asrv: AuthService, private router: Router, private ssrv: StorageService, private usrv: UtenteService) { }

    ngOnInit(): void {
        this.getUtente();
        if (this.ssrv.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.ssrv.getUser().roles;
        }
    }

    async onsubmit(form: NgForm) {
        try {
            let utenteLoggatoId = this.ssrv.getUser().id;
            this.usrv.getUtenteById(utenteLoggatoId).subscribe(resp => {
                this.utenteLoggato = resp;
                const updatedUtente = { ...this.utenteLoggato, ...form.value };
                this.usrv.updateUtente(updatedUtente, utenteLoggatoId).subscribe({
                    next: data => {
                        console.log(data);
                        // this.router.navigate(['/']);
                    }
                });
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
