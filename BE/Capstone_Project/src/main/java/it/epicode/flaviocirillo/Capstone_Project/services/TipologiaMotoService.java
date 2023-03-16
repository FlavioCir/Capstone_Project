package it.epicode.flaviocirillo.Capstone_Project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.epicode.flaviocirillo.Capstone_Project.entities.TipologiaMoto;
import it.epicode.flaviocirillo.Capstone_Project.repositories.TipologiaMotoRepo;

@Service
public class TipologiaMotoService {

	@Autowired
	private TipologiaMotoRepo tr;
	
	public TipologiaMoto save(TipologiaMoto t) {
		return tr.save(t);
	}
	
	public Optional<TipologiaMoto> getById(int id) {
		return tr.findById(id);
	}
	
	public List<TipologiaMoto> getAll() {
		return tr.findAll();
	}
	
	public Page<TipologiaMoto> getAll_page(Pageable pageable) {
		return tr.findAll(pageable);
	}
	
	public void delete(TipologiaMoto t) {
		tr.delete(t);
	}
	
}
