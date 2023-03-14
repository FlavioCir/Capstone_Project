package it.epicode.flaviocirillo.Capstone_Project.entities;

import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "utenti")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Utente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	//Concessionario
	@Column(nullable = true)
	private String ragioneSociale;
	@Column(nullable = true)
	private String partitaIva;
	@Column(nullable = true)
	private String indirizzo;
	@Column(nullable = true)
	private String cap;
	@Column(nullable = true)
	private String localita;
	@Column(nullable = true)
	private String telefono;

	//Utente
	@Column(nullable = true)
	private String nome;
	@Column(nullable = true)
	private String cognome;
	
	//Proprietà in comune
	private String username;
	private String password;
	private String email;
	private boolean attivo = true;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "ruoli_utenti",
			joinColumns = @JoinColumn(name = "utente_id"),
			inverseJoinColumns = @JoinColumn(name = "ruolo_id")
	)
	private Set<Ruolo> ruoli;
	
	@OneToMany
	@JoinTable(
			name = "preferiti",
			joinColumns = @JoinColumn(name = "utente_id"),
			inverseJoinColumns = @JoinColumn(name = "annuncio_id")
	)
	private List<Annuncio> annunci;

}
