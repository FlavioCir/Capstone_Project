import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnnuncioService } from 'src/app/services/annuncio.service';
import { Annuncio } from 'src/app/models/annuncio.interface';
import { StorageService } from 'src/app/auth/storage.service';
import { StatoVeicoloService } from 'src/app/services/stato-veicolo.service';
import { TipoMotoService } from 'src/app/services/tipo-moto.service';
import { StatoVeicolo } from 'src/app/models/stato-veicolo.interface';
import { TipoMoto } from 'src/app/models/tipo-moto.interface';
import { UtenteService } from 'src/app/services/utente.service';
import { Utente } from 'src/app/models/utente.interface';
import { UploadService } from 'src/app/services/upload.service';
import { FotoService } from 'src/app/services/foto.service';
import { Foto } from 'src/app/models/foto.interface';

import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-modifica-post',
    templateUrl: './modifica-post.component.html',
    styleUrls: ['./modifica-post.component.scss']
})
export class ModificaPostComponent implements OnInit {

    listaStatoVeicolo: StatoVeicolo[] = [];
    listaTipoMoto: TipoMoto[] = [];
    utenteLoggato: Utente | undefined;
    annunci: Annuncio[] | undefined;

    files: File[] = [];

    urlImg: string | undefined;

    annuncio: any | undefined;

    annuncioEdit: Annuncio | undefined;

    tipoMoto: TipoMoto | undefined;
    statoVeicolo!: StatoVeicolo | undefined;

    constructor(private asrv: AnnuncioService, private router: Router, private ssrv: StorageService, private sVsrv: StatoVeicoloService, private tMsrv: TipoMotoService, private usrv: UtenteService, private ups: UploadService, private fsrv: FotoService, private toast: NgToastService, private ar: ActivatedRoute) { }

    ngOnInit(): void {
        this.getUser();
        this.getAnnuncio();
    }

    getStatoVeicolo(): void {
        this.sVsrv.getStatoVeicolo().subscribe(resp => {
            Object.assign(this.listaStatoVeicolo, resp);
        });
    }

    getTipoMoto(): void {
        this.tMsrv.getTipoMoto().subscribe(resp => {
            Object.assign(this.listaTipoMoto, resp);
        });
    }

    getUser(): void {
        let userId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(userId).subscribe(resp => {
            this.utenteLoggato = resp;
            console.log(this.utenteLoggato);
        });
    }

    // Funzione per la modifica dell'annuncio
    async edit(form: NgForm) {
        const statoVeicoloId = form.value.statoVeicolo;
        this.statoVeicolo = await this.sVsrv.getStatoVeicoloById(statoVeicoloId).toPromise();

        const tipoMotoId = form.value.tipoMoto;
        this.tipoMoto = await this.tMsrv.getTipoMotoById(tipoMotoId).toPromise();

        if(!this.annuncioEdit?.marca || !this.annuncioEdit?.modello || !this.annuncioEdit?.statoVeicolo || !this.annuncioEdit?.tipoMoto || !this.annuncioEdit?.cilindrata || !this.annuncioEdit?.cavalli || !this.annuncioEdit?.kilometri || !this.annuncioEdit?.immatricolazione || !this.annuncioEdit?.localita || !this.annuncioEdit?.prezzo || !this.annuncioEdit?.descrizione) {
            this.toast.error({ detail: "Errore!", summary: "Compilare correttamente tutti i campi!", duration: 5000 });
        } else {
            let data = {
                marca: form.value.marca,
                modello: form.value.modello,
                statoVeicolo: this.statoVeicolo,
                tipoMoto: this.tipoMoto,
                cilindrata: form.value.cilindrata,
                cavalli: form.value.cavalli,
                kilometri: form.value.kilometri,
                immatricolazione: form.value.immatricolazione,
                localita: form.value.localita,
                prezzo: form.value.prezzo,
                descrizione: form.value.descrizione,
                utente: this.utenteLoggato,
                foto: this.annuncioEdit?.foto
            }
            try {
                let annuncioId = this.ar.snapshot.params["id"];
                this.asrv.updateAnnuncio(data, annuncioId).subscribe(resp => {
                    console.log(resp);
                    this.toast.success({ detail: "Annungio moditicato!", summary: "Hai modificato correttamete l'annuncio", duration: 5000 });
                    this.router.navigate(['/concessionarioDashboard']);
                });
            } catch (error) {
                console.error(error);
            }
        }
    }

    getAnnuncio(): void {
        let x = this.ar.snapshot.params["id"];
        this.asrv.getAnnuncioById(x).subscribe(resp => {
            this.annuncioEdit = resp;
            this.getStatoVeicolo();
            this.getTipoMoto();
        });
    }

}
