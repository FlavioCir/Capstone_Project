import { Ruolo } from "../enum/ruolo.enum";
import { Annuncio } from "./annuncio.interface";

export interface Utente {

    id: number,
    ragioneSociale: string,
    partitaIva: string,
    indirizzo: string,
    cap: string,
    localita: string,
    telefono: string,
    nome: string,
    cognome: string,
    username: string,
    password: string,
    email: string,
    ruolo: Ruolo,
    preferiti: Annuncio[];

}
