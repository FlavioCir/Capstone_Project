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

@Component({
    selector: 'app-add-annuncio',
    templateUrl: './add-annuncio.component.html',
    styleUrls: ['./add-annuncio.component.scss']
})
export class AddAnnuncioComponent implements OnInit {

    listaStatoVeicolo: StatoVeicolo[] = [];
    listaTipoMoto: TipoMoto[] = [];
    utenteLoggato: Utente| undefined;
    annunci: Annuncio[] | undefined;

    constructor(private asrv: AnnuncioService, private router: Router, private ssrv: StorageService, private sVsrv: StatoVeicoloService, private tMsrv: TipoMotoService, private usrv: UtenteService) { }

    ngOnInit(): void {
        this.getStatoVeicolo();
        console.log(this.listaStatoVeicolo);
        this.getTipoMoto();
        console.log(this.listaTipoMoto);
        this.getUser();
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

    async onsubmit(form: NgForm) {
        let statoDelVeicolo: StatoVeicolo = JSON.parse(form.value.statoVeicolo);
        console.log(statoDelVeicolo);
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
            utente: this.utenteLoggato
        }
        console.log(data);
        try {
            console.log(data);
            this.asrv.addAnnunci(data).subscribe({
                next: data => {
                    console.log(data);
                    this.router.navigate(['/']);
                    form.reset();
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

}
