package it.epicode.flaviocirillo.Capstone_Project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.flaviocirillo.Capstone_Project.entities.Annuncio;

@Repository
public interface AnnuncioRepo extends JpaRepository<Annuncio, Integer> {

}
