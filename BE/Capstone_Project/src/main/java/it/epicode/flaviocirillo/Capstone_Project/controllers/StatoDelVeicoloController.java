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

import it.epicode.flaviocirillo.Capstone_Project.entities.StatoDelVeicolo;
import it.epicode.flaviocirillo.Capstone_Project.entities.TipologiaMoto;
import it.epicode.flaviocirillo.Capstone_Project.services.StatoDelVeicoloService;
import it.epicode.flaviocirillo.Capstone_Project.services.TipologiaMotoService;

@RestController
@RequestMapping("/")
public class StatoDelVeicoloController {

	@Autowired
	private StatoDelVeicoloService ss;

	@GetMapping("stato_veicolo")
	public ResponseEntity<Object> getStatoVeicolo() {
		List<StatoDelVeicolo> statoVeicolo = ss.getAll();
		
		if(statoVeicolo.isEmpty()) {
			return new ResponseEntity<>("Stato del veicolo non trovato", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(statoVeicolo, HttpStatus.CREATED);
	}
	
	@GetMapping("stato_veicolo_page")
	public ResponseEntity<Object> getStatoVeicoloInPages(Pageable pageable) {
		Page<StatoDelVeicolo> statoVeicolo = ss.getAll_page(pageable);
		
		if(statoVeicolo.isEmpty()) {
			return new ResponseEntity<>("Stato del veicolo non trovato", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(statoVeicolo, HttpStatus.OK);
	}
	
	@GetMapping("stato_veicolo/{id}")
	public ResponseEntity<Object> getStatoVeicoloById(@PathVariable int id) {
		Optional<StatoDelVeicolo> statoVeicoloObj = ss.getById(id);
		
		if(statoVeicoloObj.isEmpty()) {
			return new ResponseEntity<>("Stato del veicolo non trovato", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(statoVeicoloObj.get(), HttpStatus.OK);
	}
	
	@PostMapping("stato_veicolo")
	public ResponseEntity<Object> createStatoVeicolo(@RequestBody StatoDelVeicolo s) {
		StatoDelVeicolo statoVeicolo = ss.save(s);
		
		return new ResponseEntity<Object>(statoVeicolo, HttpStatus.CREATED);
	}
	
	@PutMapping("stato_veicolo/{id}")
	public ResponseEntity<Object> updateStatoVeicolo(@PathVariable int id, @RequestBody StatoDelVeicolo _statoVeicolo) {
		Optional<StatoDelVeicolo> statoVeicoloObj = ss.getById(id);
		
		if(statoVeicoloObj.isEmpty()) {
			return new ResponseEntity<Object>("Stato del veicolo non trovato", HttpStatus.NOT_FOUND);
		}
		
		StatoDelVeicolo statoVeicolo = statoVeicoloObj.get();
		
		statoVeicolo.setStatoVeicolo(_statoVeicolo.getStatoVeicolo());
		
		ss.save(statoVeicolo);
		
		return new ResponseEntity<Object>(statoVeicolo, HttpStatus.CREATED);
	}
	
	@DeleteMapping("stato_veicolo/{id}")
	public ResponseEntity<Object> deleteStatoVeicolo(@PathVariable int id) {
		Optional<StatoDelVeicolo> statoVeicoloObj = ss.getById(id);
		
		if(statoVeicoloObj.isEmpty()) {
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		}
		
		ss.delete(statoVeicoloObj.get());
		
		return new ResponseEntity<>(String.format("Stato del veicolo con id %d eliminato", id), HttpStatus.OK);
	}
	
}
