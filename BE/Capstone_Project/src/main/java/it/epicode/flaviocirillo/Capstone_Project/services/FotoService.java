package it.epicode.flaviocirillo.Capstone_Project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.flaviocirillo.Capstone_Project.entities.Annuncio;
import it.epicode.flaviocirillo.Capstone_Project.entities.Foto;
import it.epicode.flaviocirillo.Capstone_Project.repositories.FotoRepo;

@Service
public class FotoService {

	@Autowired
	private FotoRepo fr;
	
	public Foto save(Foto f) {
		return fr.save(f);
	}
	
	public Optional<Foto> getById(int id) {
		return fr.findById(id);
	}
	
	public List<Foto> getAll() {
		return fr.findAll();
	}
	
	public Page<Foto> getAll_page(Pageable pageable) {
		return fr.findAll(pageable);
	}
	
	public void delete(Foto f) {
		fr.delete(f);
	}
	
	public List<Foto> getFotoAnnuncio(Annuncio annuncio) {
		return fr.findByAnnuncio(annuncio);
	}
	
}
