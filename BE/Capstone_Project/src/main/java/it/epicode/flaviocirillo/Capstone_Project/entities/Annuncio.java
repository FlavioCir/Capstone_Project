package it.epicode.flaviocirillo.Capstone_Project.entities;

import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

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
	
	@Column(nullable = true)
	@JsonManagedReference
	@OneToMany(mappedBy = "annuncio")
	private Set<Foto> foto;
	
	private String marca;
	private String modello;
	
	@OneToOne
//	@JoinTable(
//			name = "tipo_di_moto",
//			joinColumns = @JoinColumn(name = "annuncio_id"),
//			inverseJoinColumns = @JoinColumn(name = "tipologia_moto_id")
//	)
	private TipologiaMoto tipoMoto;
	
	@OneToOne
//	@JoinTable(
//			name = "stato_del_veicolo",
//			joinColumns = @JoinColumn(name = "annuncio_id"),
//			inverseJoinColumns = @JoinColumn(name = "stato_del_veicolo_id")
//	)
	private StatoDelVeicolo statoVeicolo;
	
	private int cilindrata;
	private int cavalli;
	private long kilometri;
	private String immatricolazione;
	private String localita;
	private double prezzo;
	private String descrizione;
	
	 @ManyToOne
	 @JoinColumn(name = "utente_id")
	 private Utente utente;
	
}
