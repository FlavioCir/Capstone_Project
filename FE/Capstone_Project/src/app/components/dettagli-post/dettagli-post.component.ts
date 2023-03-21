import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/auth/storage.service';
import { Annuncio } from 'src/app/models/annuncio.interface';
import { AnnuncioService } from 'src/app/services/annuncio.service';
import { ActivatedRoute } from '@angular/router';
import { UtenteService } from 'src/app/services/utente.service';
import { Router } from '@angular/router';
import { Utente } from 'src/app/models/utente.interface';

@Component({
    selector: 'app-dettagli-post',
    templateUrl: './dettagli-post.component.html',
    styleUrls: ['./dettagli-post.component.scss']
})
export class DettagliPostComponent implements OnInit {

    annuncio: Annuncio | undefined;

    utenteLoggato: Utente | undefined;

    preferiti: any;
    annuncioEsistente: Annuncio | undefined;

    constructor(private ssrv: StorageService, private asrv: AnnuncioService, private ar: ActivatedRoute, private usrv: UtenteService, private router: Router) { }

    ngOnInit(): void {
        this.getAnnuncio()
    }

    isAdmin(): boolean {
        this.utenteLoggato = this.ssrv.getUser().id;
        if(this.utenteLoggato === this.annuncio?.utente.id) {
            return true;
        }

        return false;
    }

    getAnnuncio(): void {
        let x = this.ar.snapshot.params["id"];
        this.asrv.getAnnuncioById(x).subscribe(resp => {
            this.annuncio = resp;
            console.log(resp);
        });
    }

    eliminaAnnuncio(id: number): void {
        this.asrv.deleteAnnuncio(id).subscribe(resp => {
            this.router.navigate(['/concessionarioDashboard']);
        });
    }

}
