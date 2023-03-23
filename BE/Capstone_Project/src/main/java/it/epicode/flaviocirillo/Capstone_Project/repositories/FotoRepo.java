package it.epicode.flaviocirillo.Capstone_Project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.flaviocirillo.Capstone_Project.entities.Annuncio;
import it.epicode.flaviocirillo.Capstone_Project.entities.Foto;

@Repository
public interface FotoRepo extends JpaRepository<Foto, Integer> {

	List<Foto> findByAnnuncio(Annuncio annuncio);
	
}
