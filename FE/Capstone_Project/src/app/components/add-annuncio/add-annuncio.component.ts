import { Component, OnInit } from '@angular/core';
import { StatoVeicolo } from 'src/app/enum/stato-veicolo.enum';
import { TipoMoto } from 'src/app/enum/tipo-moto.enum';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnuncioService } from 'src/app/services/annuncio.service';
import { Annuncio } from 'src/app/models/annuncio.interface';
import { StorageService } from 'src/app/auth/storage.service';

@Component({
    selector: 'app-add-annuncio',
    templateUrl: './add-annuncio.component.html',
    styleUrls: ['./add-annuncio.component.scss']
})
export class AddAnnuncioComponent implements OnInit {

    statoVeicolo: string[] = Object.values(StatoVeicolo);
    tipoMoto: string[] = Object.values(TipoMoto);
    annunci: Annuncio[] | undefined;

    constructor(private asrv: AnnuncioService, private router: Router, private ssrv: StorageService) { }

    ngOnInit(): void {
    }

    // async onsubmit(form: NgForm) {
    //     try {
    //         await this.asrv.addAnnunci(form.value).subscribe({
    //             next: data => {
    //                 console.log(data);
    //                 this.router.navigate(['/'])
    //             }
    //         })
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    onsubmit(form: NgForm) {
        const nuovoAnnuncio: Partial<Annuncio >= {
            marca: form.value.marca,
            modello: form.value.modello
        }
        this.asrv.addAnnunci(nuovoAnnuncio).subscribe((dati: any) => {
            console.log(dati);
            this.annunci = dati;
        })
    }

}
