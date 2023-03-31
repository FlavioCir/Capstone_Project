import { Component, OnInit } from '@angular/core';
import { Messaggio } from 'src/app/models/messaggio.interface';
import { MessaggioService } from 'src/app/services/messaggio.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/auth/storage.service';

@Component({
    selector: 'app-dettagli-notifica',
    templateUrl: './dettagli-notifica.component.html',
    styleUrls: ['./dettagli-notifica.component.scss']
})
export class DettagliNotificaComponent implements OnInit {

    notifica: Messaggio | undefined;

    constructor(private msrv: MessaggioService, private ar: ActivatedRoute, private ssrv: StorageService) { }

    ngOnInit(): void {
        this.getNotifica();
    }

    getNotifica(): void {
        let notificaId = this.ar.snapshot.params["id"];
        this.msrv.getMessaggioById(notificaId).subscribe(resp => {
            this.notifica = resp;
        });
    }

    // Controllo se l'utente loggato è admin
    isAdmin(): boolean {
        return this.ssrv.isAdmin();
    }

}
