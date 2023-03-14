package it.epicode.flaviocirillo.Capstone_Project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import it.epicode.flaviocirillo.Capstone_Project.entities.Annuncio;
import it.epicode.flaviocirillo.Capstone_Project.entities.Ruolo;
import it.epicode.flaviocirillo.Capstone_Project.entities.TipoRuolo;
import it.epicode.flaviocirillo.Capstone_Project.entities.TipoVeicolo;
import it.epicode.flaviocirillo.Capstone_Project.entities.Tipologia;
import it.epicode.flaviocirillo.Capstone_Project.entities.Utente;

@Configuration
public class Beans {

	@Bean
	@Scope("prototype")
	public Utente utente(String nome, String cognome, String password, String email, String username) {
		return Utente.builder()
				.nome(nome)
				.cognome(cognome)
				.password(password)
				.email(email)
				.username(username)
				.attivo(true)
				.build();
	}
	
	@Bean
	@Scope("prototype")
	public Utente concessionario(String ragioneSociale, String partitaIva, String indirizzo, String cap, String localita, String telefono, String password, String email, String username) {
		return Utente.builder()
				.ragioneSociale(ragioneSociale)
				.partitaIva(partitaIva)
				.indirizzo(indirizzo)
				.cap(cap)
				.localita(localita)
				.telefono(telefono)
				.password(password)
				.email(email)
				.username(username)
				.attivo(true)
				.build();
	}
	
	@Bean
	@Scope("prototype")
	public Annuncio annuncio(String foto, String marca, String modello, TipoVeicolo tipoVeicolo, Tipologia tipologia, int cilindrata, int cavalli, long kilometri, String immatricolazione, String localita, double prezzo, String descrizione) {
		return Annuncio.builder()
				.foto(foto)
				.marca(marca)
				.modello(modello)
				.tipoVeicolo(tipoVeicolo)
				.tipologia(tipologia)
				.cilindrata(cilindrata)
				.cavalli(cavalli)
				.kilometri(kilometri)
				.immatricolazione(immatricolazione)
				.localita(localita)
				.prezzo(prezzo)
				.descrizione(descrizione)
				.build();
	}
	
	@Bean
	@Scope("prototype")
	public Ruolo ruolo(TipoRuolo tr) {
		return Ruolo.builder()
				.tipoRuolo(tr)
				.build();
	}
	
}
