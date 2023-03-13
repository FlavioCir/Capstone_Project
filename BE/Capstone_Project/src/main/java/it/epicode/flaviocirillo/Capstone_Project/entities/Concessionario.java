package it.epicode.flaviocirillo.Capstone_Project.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "concessionari")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Concessionario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String ragioneSociale;
	private String partitaIva;
	private String indirizzo;
	private String cap;
	private String localita;
	private String email;
	private String password;
	private String telefono;
	private boolean attivo = true;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "ruoli_concessionari",
			joinColumns = @JoinColumn(name = "concessionario_id"),
			inverseJoinColumns = @JoinColumn(name = "ruolo_id")
	)
	private Set<Ruolo> ruoli;
	
}
