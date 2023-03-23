import { Utente } from "./utente.interface";
import { StatoVeicolo } from "./stato-veicolo.interface";
import { TipoMoto } from "./tipo-moto.interface";
import { Foto } from "./foto.interface";

export interface Annuncio {

    id: number,
    marca: string,
    modello: string,
    statoVeicolo: StatoVeicolo,
    tipoMoto: TipoMoto,
    cilindrata: number,
    cavalli: number,
    kilometri: number,
    immatricolazione: string,
    localita: string,
    prezzo: number,
    descrizione: string,
    utente: Utente,
    foto: Foto[],

    preferito: boolean

}
