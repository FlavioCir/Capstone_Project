package it.epicode.flaviocirillo.Capstone_Project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.flaviocirillo.Capstone_Project.entities.Concessionario;
import it.epicode.flaviocirillo.Capstone_Project.repositories.ConcessionarioRepo;

@Service
public class ConcessionarioService {

	@Autowired
	private ConcessionarioRepo cr;
	
	public Concessionario save(Concessionario c) {
		return cr.save(c);
	}
	
	public Optional<Concessionario> getById(int id) {
		return cr.findById(id);
	}
	
	public List<Concessionario> getAll() {
		return cr.findAll();
	}
	
	public Page<Concessionario> getAll_page(Pageable pageable) {
		return cr.findAll(pageable);
	}
	
	public void delete(Concessionario c) {
		cr.delete(c);
	}
	
}
