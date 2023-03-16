package it.epicode.flaviocirillo.Capstone_Project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.epicode.flaviocirillo.Capstone_Project.entities.StatoDelVeicolo;

@Repository
public interface StatoDelVeicoloRepo extends JpaRepository<StatoDelVeicolo, Integer> {

}
