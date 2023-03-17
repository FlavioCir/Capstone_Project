import { Component, OnInit } from '@angular/core';
import { Annuncio } from 'src/app/models/annuncio.interface';
import { AnnuncioService } from 'src/app/services/annuncio.service';
import { StorageService } from 'src/app/auth/storage.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    annunci: Annuncio[] | undefined;

    isLoggigIn = false;
    roles: string[] = [];

    constructor(private asrv: AnnuncioService, private ssrv: StorageService) { }

    ngOnInit(): void {
        if (this.ssrv.isLoggedIn()) {
            this.isLoggigIn = true;
            this.roles = this.ssrv.getUser().roles;
        }
        this.getAnnuncio();
    }

    getAnnuncio(): void {
        this.asrv.getAnnuncio().subscribe(resp => {
            this.annunci = resp;
            console.log(resp);
        })
    }

    isAdmin(): boolean {
        return this.ssrv.isAdmin();
    }

    // FILTRI ----------------------------------------------------------------

    getAnnuncioPerMarca(): void {
        const marcaInput = document.getElementById('marca') as HTMLInputElement;

        const marca = marcaInput.value;

        this.asrv.getAnnuncioPerMarca(marca).subscribe(resp => {
            this.annunci = [];
            this.annunci = resp
        });
    }

    getAnnuncioPerModello(): void {
        const modelloInput = document.getElementById('modello') as HTMLInputElement;

        const modello = modelloInput.value;

        this.asrv.getAnnuncioPerModello(modello).subscribe(resp => {
            this.annunci = [];
            this.annunci = resp
        });
    }

    getAnnuncioPerImmatricolazione(): void {
        const annoMinInput = document.getElementById('minAnno') as HTMLInputElement;
        const annoMaxInput = document.getElementById('maxAnno') as HTMLInputElement;

        const annoMin = annoMinInput.value;
        const annoMax = annoMaxInput.value;

        this.asrv.getAnnuncioPerImmatricolazione(annoMin, annoMax).subscribe(resp => {
            this.annunci = [];
            this.annunci = resp;
        });
    }

    getAnnuncioPerKilometri(): void {
        const kilometriMinInput = document.getElementById('minKilometri') as HTMLInputElement;
        const kilometriMaxInput = document.getElementById('maxKilometri') as HTMLInputElement;

        const kilometriMin = parseInt(kilometriMinInput.value);
        const kilometriMax = parseInt(kilometriMaxInput.value);

        this.asrv.getAnnuncioPerKilometri(kilometriMin, kilometriMax).subscribe(resp => {
            this.annunci = [];
            this.annunci = resp;
        });
    }

    getAnnuncioPerPrezzo(): void {
        const prezzoInput = document.getElementById('prezzo') as HTMLInputElement;

        const prezzo = parseInt(prezzoInput.value);

        this.asrv.getAnnuncioPerPrezzo(prezzo).subscribe(resp => {
            this.annunci = [];
            this.annunci = resp;
        });
    }

}
