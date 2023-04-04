import { Annuncio } from "./annuncio.interface";
import { Utente } from "./utente.interface";

export interface Messaggio {

    id: number,
    messaggio: string,
    data: string,
    ora: string,
    annuncio: Annuncio
    utente: Utente,
    concessionario: Utente

}
