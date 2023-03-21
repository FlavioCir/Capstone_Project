package it.epicode.flaviocirillo.Capstone_Project.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.flaviocirillo.Capstone_Project.entities.Annuncio;
import it.epicode.flaviocirillo.Capstone_Project.entities.Utente;

@Repository
public interface UtenteRepo extends JpaRepository<Utente, Integer> {
	
	Optional<Utente> findByUsername(String n);
	
	List<Utente> findByPreferiti(Annuncio annuncio);
	
}
