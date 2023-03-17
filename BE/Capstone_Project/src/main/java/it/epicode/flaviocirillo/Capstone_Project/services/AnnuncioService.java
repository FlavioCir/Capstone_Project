package it.epicode.flaviocirillo.Capstone_Project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.flaviocirillo.Capstone_Project.entities.Annuncio;
import it.epicode.flaviocirillo.Capstone_Project.repositories.AnnuncioRepo;

@Service
public class AnnuncioService {

	@Autowired
	private AnnuncioRepo ar;
	
	public Annuncio save(Annuncio a) {
		return ar.save(a);
	}
	
	public Optional<Annuncio> getById(int id) {
		return ar.findById(id);
	}
	
	public List<Annuncio> getAll() {
		return ar.findAll();
	}
	
	public Page<Annuncio> getAll_page(Pageable pageable) {
		return ar.findAll(pageable);
	}
	
	public void delete(Annuncio a) {
		ar.delete(a);
	}
	
	//FILTRI
	
	public List<Annuncio> findByMarca(String marca) {
		return ar.findByMarca(marca);
	}
	
	public List<Annuncio> findByModello(String modello) {
		return ar.findByModello(modello);
	}
	
	public List<Annuncio> findByAnnoImmatricolazione(String min, String max) {
		return ar.findByAnnoImmatricolazione(min, max);
	}
	
	public List<Annuncio> findByKilometri(long min, long max) {
		return ar.findByKilometri(min, max);
	}
	
	public List<Annuncio> findByPrezzo(double prezzo) {
		return ar.findByPrezzo(prezzo);
	}
	
}
