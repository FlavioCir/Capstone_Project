package it.epicode.flaviocirillo.Capstone_Project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.flaviocirillo.Capstone_Project.entities.Messaggio;
import it.epicode.flaviocirillo.Capstone_Project.repositories.MessaggioRepo;

@Service
public class MessaggioService {

	@Autowired
	private MessaggioRepo mr;
	
	public Messaggio save(Messaggio m) {
		return mr.save(m);
	}
	
	public Optional<Messaggio> getById(int id) {
		return mr.findById(id);
	}
	
	public List<Messaggio> getAll() {
		return mr.findAll();
	}
	
	public Page<Messaggio> getAll_page(Pageable pageable) {
		return mr.findAll(pageable);
	}
	
	public void delete(Messaggio m) {
		mr.delete(m);
	}
	
}
