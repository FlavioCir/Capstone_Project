import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { Annuncio } from 'src/app/models/annuncio.interface';
import { AnnuncioService } from 'src/app/services/annuncio.service';
import { ActivatedRoute } from '@angular/router';
import { UtenteService } from 'src/app/services/utente.service';
import { Utente } from 'src/app/models/utente.interface';

@Component({
    selector: 'app-dettagli-post',
    templateUrl: './dettagli-post.component.html',
    styleUrls: ['./dettagli-post.component.scss']
})
export class DettagliPostComponent implements OnInit {

    annuncio: Annuncio | undefined;

    preferiti: any;
    annuncioEsistente: Annuncio | undefined;

    constructor(private ssrv: StorageService, private asrv: AnnuncioService, private ar: ActivatedRoute, private usrv: UtenteService) { }

    ngOnInit(): void {
        this.getAnnuncio();
    }

    isAdmin(): boolean {
        return this.ssrv.isAdmin();
    }

    getAnnuncio(): void {
        let x = this.ar.snapshot.params["id"];
        this.asrv.getAnnuncioById(x).subscribe(resp => {
            this.annuncio = resp;
            console.log(resp);
        });
    }

    aggiungiPreferiti(annuncio: Annuncio): void {
        console.log(annuncio);
        let utenteLoggatoId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(utenteLoggatoId).subscribe(resp => {
            let utente: Utente = resp;
            this.annuncioEsistente = utente.preferiti.find(a => a.id === annuncio.id);
            if (this.annuncioEsistente) {
                console.log("Annuncio rimosso dai preferiti");
                return;
            } else {
                utente.preferiti.push(annuncio);
                this.usrv.updateUtente(utente, utenteLoggatoId).subscribe(resp => {
                    console.log(resp);
                });
            }
        });
    }

    // elimindaPreferito(annuncio: Annuncio): void {
    //     console.log(annuncio);
    //     let utenteLoggatoId = this.ssrv.getUser().id;
    //     this.usrv.getUtenteById(utenteLoggatoId).subscribe(resp => {
    //         let utente: Utente = resp;
    //         utente.preferiti.delete(annuncio);
    //         this.usrv.updateUtente(utente, utenteLoggatoId).subscribe(resp => {
    //             console.log(resp);
    //         });
    //     });
    // }

}
