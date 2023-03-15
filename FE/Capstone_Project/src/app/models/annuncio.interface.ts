import { StatoVeicolo } from "../enum/stato-veicolo.enum";
import { TipoMoto } from "../enum/tipo-moto.enum";
import { Utente } from "./utente.interface";

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
    descrizione: string
    utente: Utente

}
