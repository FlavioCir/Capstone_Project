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

import it.epicode.flaviocirillo.Capstone_Project.entities.Foto;
import it.epicode.flaviocirillo.Capstone_Project.services.FotoService;

@RestController
@RequestMapping("/")
public class FotoController {

	@Autowired
	private FotoService fs;

	@GetMapping("foto")
	public ResponseEntity<Object> getFoto() {
		List<Foto> foto = fs.getAll();
		
		if(foto.isEmpty()) {
			return new ResponseEntity<>("Foto non trovate", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(foto, HttpStatus.CREATED);
	}
	
	@GetMapping("foto_page")
	public ResponseEntity<Object> getFotoInPages(Pageable pageable) {
		Page<Foto> foto = fs.getAll_page(pageable);
		
		if(foto.isEmpty()) {
			return new ResponseEntity<>("Foto non trovate", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(foto, HttpStatus.OK);
	}
	
	@GetMapping("foto/{id}")
	public ResponseEntity<Object> getFotoById(@PathVariable int id) {
		Optional<Foto> fotoObj = fs.getById(id);
		
		if(fotoObj.isEmpty()) {
			return new ResponseEntity<>("Foto non trovata", HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(fotoObj.get(), HttpStatus.OK);
	}
	
	@PostMapping("foto")
	public ResponseEntity<Object> createFoto(@RequestBody Foto f) {
		Foto foto = fs.save(f);
		
		return new ResponseEntity<Object>(foto, HttpStatus.CREATED);
	}
	
	@PutMapping("foto/{id}")
	public ResponseEntity<Object> updateFoto(@PathVariable int id, @RequestBody Foto _foto) {
		Optional<Foto> fotoObj = fs.getById(id);
		
		if(fotoObj.isEmpty()) {
			return new ResponseEntity<Object>("Foto non trovata", HttpStatus.NOT_FOUND);
		}
		
		Foto foto = fotoObj.get();
		
		foto.setUrl(_foto.getUrl());
		
		fs.save(foto);
		
		return new ResponseEntity<Object>(foto, HttpStatus.CREATED);
	}
	
	@DeleteMapping("foto/{id}")
	public ResponseEntity<Object> deleteFoto(@PathVariable int id) {
		Optional<Foto> fotoObj = fs.getById(id);
		
		if(fotoObj.isEmpty()) {
			return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
		}
		
		fs.delete(fotoObj.get());
		
		return new ResponseEntity<>(String.format("Foto con id %d eliminata", id), HttpStatus.OK);
	}
	
}
