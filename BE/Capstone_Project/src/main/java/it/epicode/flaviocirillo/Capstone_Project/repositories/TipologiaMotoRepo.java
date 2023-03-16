package it.epicode.flaviocirillo.Capstone_Project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.flaviocirillo.Capstone_Project.entities.TipologiaMoto;

@Repository
public interface TipologiaMotoRepo extends JpaRepository<TipologiaMoto, Integer> {

}
