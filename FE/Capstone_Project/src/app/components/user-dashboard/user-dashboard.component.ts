import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/models/utente.interface';
import { UtenteService } from 'src/app/services/utente.service';
import { StorageService } from 'src/app/auth/storage.service';
import { Annuncio } from 'src/app/models/annuncio.interface';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

    utenteLoggato: Utente | undefined;
    preferitiUtente: Annuncio[] | undefined;

    constructor(private usrv: UtenteService, private ssrv: StorageService) { }

    ngOnInit(): void {
        this.getUtente();
    }

    getUtente(): void {
        let userId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(userId).subscribe(resp => {
            this.utenteLoggato = resp;
            this.preferitiUtente = this.utenteLoggato.preferiti;
        });
    }

}
