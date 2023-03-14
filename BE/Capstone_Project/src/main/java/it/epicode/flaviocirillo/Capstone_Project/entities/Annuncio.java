package it.epicode.flaviocirillo.Capstone_Project.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "annunci")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Annuncio {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String foto;
	private String marca;
	private String modello;
	
	@Enumerated(EnumType.STRING)
	private TipoVeicolo tipoVeicolo;
	
	@Enumerated(EnumType.STRING)
	private Tipologia tipologia;
	
	private int cilindrata;
	private int cavalli;
	private long kilometri;
	private String immatricolazione;
	private String localita;
	private double prezzo;
	private String descrizione;
	
}
