package it.epicode.flaviocirillo.Capstone_Project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.flaviocirillo.Capstone_Project.entities.StatoDelVeicolo;
import it.epicode.flaviocirillo.Capstone_Project.repositories.StatoDelVeicoloRepo;

@Service
public class StatoDelVeicoloService {

	@Autowired
	private StatoDelVeicoloRepo sr;
	
	public StatoDelVeicolo save(StatoDelVeicolo s) {
		return sr.save(s);
	}
	
	public Optional<StatoDelVeicolo> getById(int id) {
		return sr.findById(id);
	}
	
	public List<StatoDelVeicolo> getAll() {
		return sr.findAll();
	}
	
	public Page<StatoDelVeicolo> getAll_page(Pageable pageable) {
		return sr.findAll(pageable);
	}
	
	public void delete(StatoDelVeicolo s) {
		sr.delete(s);
	}
	
}
