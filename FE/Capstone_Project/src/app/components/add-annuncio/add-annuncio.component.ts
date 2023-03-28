import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    selector: 'app-add-annuncio',
    templateUrl: './add-annuncio.component.html',
    styleUrls: ['./add-annuncio.component.scss'],
    providers: [UploadService]
})
export class AddAnnuncioComponent implements OnInit {

    listaStatoVeicolo: StatoVeicolo[] = [];
    listaTipoMoto: TipoMoto[] = [];
    utenteLoggato: Utente | undefined;
    annunci: Annuncio[] | undefined;

    files: File[] = [];

    urlImg: string | undefined;

    annuncio: any | undefined;

    constructor(private asrv: AnnuncioService, private router: Router, private ssrv: StorageService, private sVsrv: StatoVeicoloService, private tMsrv: TipoMotoService, private usrv: UtenteService, private ups: UploadService, private fsrv: FotoService, private toast: NgToastService) { }

    ngOnInit(): void {
        this.getStatoVeicolo();
        console.log(this.listaStatoVeicolo);
        this.getTipoMoto();
        console.log(this.listaTipoMoto);
        this.getUser();
    }

    // Funzione per il recupero dell'enum per lo stato del veicolo e lo associo alla variabile listaStatoVeicolo
    getStatoVeicolo(): void {
        this.sVsrv.getStatoVeicolo().subscribe(resp => {
            Object.assign(this.listaStatoVeicolo, resp);
        });
    }

    // Funzione per il recupero dell'enum per la tipologia della moto e lo associo alla variabile listaTipoMoto
    getTipoMoto(): void {
        this.tMsrv.getTipoMoto().subscribe(resp => {
            Object.assign(this.listaTipoMoto, resp);
        });
    }

    // Funzioen per il recupero dell'utente loggato per id
    getUser(): void {
        let userId = this.ssrv.getUser().id;
        this.usrv.getUtenteById(userId).subscribe(resp => {
            this.utenteLoggato = resp;
            console.log(this.utenteLoggato);
        });
    }

    // UPLOAD foto annunci
    onSelect(event: any) {
        console.log(event);
        this.files.push(...event.addedFiles);
    }

    onRemove(event: any) {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    }

    onUpload(annuncio: Annuncio) {
        for (let i = 0; i < this.files.length; i++) {
            const data = new FormData();
            data.append('file', this.files[i]);
            data.append('upload_preset', 'RideResale');
            data.append('cloud_name', 'do3bktftk');

            this.ups.uploadImage(data).subscribe(response => {
                if (response) {
                    console.log(response);
                    this.urlImg = response.secure_url;
                    const nuovaFoto: Partial<Foto> = {
                        url: this.urlImg,
                        annuncio: annuncio
                    }
                    this.fsrv.addFoto(nuovaFoto).subscribe(resp => {
                        console.log("foto aggiunta con successo", resp)
                    });
                }
            });
        }
    }

    // Funzione per l'aggiunta di un annuncio
    async onsubmit(form: NgForm) {
        let statoDelVeicolo: StatoVeicolo = JSON.parse(form.value.statoVeicolo);
        let tipoDiMoto: TipoMoto = JSON.parse(form.value.tipoMoto);
        let data = {
            marca: form.value.marca,
            modello: form.value.modello,
            statoVeicolo: statoDelVeicolo,
            tipoMoto: tipoDiMoto,
            cilindrata: form.value.cilindrata,
            cavalli: form.value.cavalli,
            kilometri: form.value.kilometri,
            immatricolazione: form.value.immatricolazione,
            localita: form.value.localita,
            prezzo: form.value.prezzo,
            descrizione: form.value.descrizione,
            utente: this.utenteLoggato,
            foto: this.urlImg
        }
        try {
            if (this.files.length < 1) {
                alert('Inserisci almeno una foto prima di continuare');
                return;
            } else {
                this.asrv.addAnnunci(data).subscribe({
                    next: newAnnuncio => {
                        console.log(newAnnuncio);
                        this.annuncio = newAnnuncio;
                        this.onUpload(this.annuncio);
                        this.toast.success({detail: "Annungio inserito corretamente!", summary: "Torna indietro per visualizzarlo!", duration: 5000});
                    }
                });
            }
        } catch (error) {
            console.error(error)
        }
    }

}
