package it.epicode.flaviocirillo.Capstone_Project.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.epicode.flaviocirillo.Capstone_Project.entities.TipologiaMoto;
import it.epicode.flaviocirillo.Capstone_Project.services.TipologiaMotoService;

@RestController
@RequestMapping("/")
public class TipologiaMotoController {

	@Autowired
	private TipologiaMotoService ts;

	@GetMapping("tipo_moto")
	public ResponseEntity<Object> getTipoMoto() {
		List<TipologiaMoto> tipoMoto = ts.getAll();
		
		if(tipoMoto.isEmpty()) {
			return new ResponseEntity<>("Tipologia di moto non trovate", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(tipoMoto, HttpStatus.CREATED);
	}
	
	@GetMapping("tipo_moto_page")
	public ResponseEntity<Object> getTipoMotoInPages(Pageable pageable) {
		Page<TipologiaMoto> tipoMoto = ts.getAll_page(pageable);
		
		if(tipoMoto.isEmpty()) {
			return new ResponseEntity<>("Tipologia di moto non trovate", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(tipoMoto, HttpStatus.OK);
	}
	
	@GetMapping("tipo_moto/{id}")
	public ResponseEntity<Object> getTipoMotoById(@PathVariable int id) {
		Optional<TipologiaMoto> tipoMotoObj = ts.getById(id);
		
		if(tipoMotoObj.isEmpty()) {
			return new ResponseEntity<>("Tipologia di moto non trovata", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(tipoMotoObj.get(), HttpStatus.OK);
	}
	
	@PostMapping("tipo_moto")
	public ResponseEntity<Object> createTipoMoto(@RequestBody TipologiaMoto t) {
		TipologiaMoto tipoMoto = ts.save(t);
		
		return new ResponseEntity<Object>(tipoMoto, HttpStatus.CREATED);
	}
	
	@PutMapping("tipo_moto/{id}")
	public ResponseEntity<Object> updateFoto(@PathVariable int id, @RequestBody TipologiaMoto _tipoMoto) {
		Optional<TipologiaMoto> tipoMotoObj = ts.getById(id);
		
		if(tipoMotoObj.isEmpty()) {
			return new ResponseEntity<Object>("Tipologia di moto non trovata", HttpStatus.NOT_FOUND);
		}
		
		TipologiaMoto tipoMoto = tipoMotoObj.get();
		
		tipoMoto.setTipoMoto(_tipoMoto.getTipoMoto());
		
		ts.save(tipoMoto);
		
		return new ResponseEntity<Object>(tipoMoto, HttpStatus.CREATED);
	}
	
	@DeleteMapping("tipo_moto/{id}")
	public ResponseEntity<Object> deleteTipoMoto(@PathVariable int id) {
		Optional<TipologiaMoto> tipoMotoObj = ts.getById(id);
		
		if(tipoMotoObj.isEmpty()) {
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		}
		
		ts.delete(tipoMotoObj.get());
		
		return new ResponseEntity<>(String.format("Tipologia di moto con id %d eliminata", id), HttpStatus.OK);
	}
	
}
