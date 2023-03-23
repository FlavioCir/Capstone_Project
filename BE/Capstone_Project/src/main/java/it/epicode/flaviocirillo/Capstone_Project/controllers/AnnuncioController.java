package it.epicode.flaviocirillo.Capstone_Project.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;

import it.epicode.flaviocirillo.Capstone_Project.entities.Annuncio;
import it.epicode.flaviocirillo.Capstone_Project.entities.Foto;
import it.epicode.flaviocirillo.Capstone_Project.entities.Utente;
import it.epicode.flaviocirillo.Capstone_Project.services.AnnuncioService;
import it.epicode.flaviocirillo.Capstone_Project.services.FotoService;
import it.epicode.flaviocirillo.Capstone_Project.services.UtenteService;

@RestController
@RequestMapping("/")
public class AnnuncioController {

	@Autowired
	private AnnuncioService as;
	
	@Autowired
	private UtenteService us;
	
	@Autowired
	private FotoService fs;
	
	@GetMapping("annunci")
	public ResponseEntity<List<Annuncio>> getAnnunci() {
		List<Annuncio> annunci = as.getAll();
		
		return new ResponseEntity<>(annunci, HttpStatus.CREATED);
	}
	
	@GetMapping("annunci/{id}")
	public ResponseEntity<Object> getAnnunciById(@PathVariable int id) {
		Optional<Annuncio> annuncioObj = as.getById(id);
		
		ResponseEntity<Object> check = checkExists(annuncioObj);
		if(check != null) return check;
		
		return new ResponseEntity<>(annuncioObj.get(), HttpStatus.OK);
	}
	
	@GetMapping("annunci_page")
	public ResponseEntity<Object> getAnnunciInPages(Pageable pageable) {
		Page<Annuncio> annuncio = as.getAll_page(pageable);
		
		if(annuncio.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(annuncio, HttpStatus.OK);
	}
	
	@PostMapping("annunci")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> createAnnunci(@RequestBody Annuncio a) {
		Annuncio annuncio = as.save(a);
		
		return new ResponseEntity<Object>(annuncio, HttpStatus.CREATED);
	}
	
	@PutMapping("annunci/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> updateAnnuncio(@PathVariable int id, @RequestBody Annuncio _annuncio) {
		Optional<Annuncio> annuncioObj = as.getById(id);
		
		ResponseEntity<Object> check = checkExists(annuncioObj);
		if(check != null) return check;
		
		Annuncio annuncio = annuncioObj.get();
		
		annuncio.setFoto(_annuncio.getFoto());
		annuncio.setMarca(_annuncio.getMarca());
		annuncio.setModello(_annuncio.getModello());
		annuncio.setTipoMoto(_annuncio.getTipoMoto());
		annuncio.setStatoVeicolo(_annuncio.getStatoVeicolo());
		annuncio.setCilindrata(_annuncio.getCilindrata());
		annuncio.setCavalli(_annuncio.getCavalli());
		annuncio.setKilometri(_annuncio.getKilometri());
		annuncio.setImmatricolazione(_annuncio.getImmatricolazione());
		annuncio.setLocalita(_annuncio.getLocalita());
		annuncio.setPrezzo(_annuncio.getPrezzo());
		annuncio.setDescrizione(_annuncio.getDescrizione());
		
		as.save(annuncio);
		
		return new ResponseEntity<Object>(annuncio, HttpStatus.CREATED);
	}
	
	@DeleteMapping("annunci/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Object> deleteAnnuncio(@PathVariable int id) {
		Optional<Annuncio> annuncioObj = as.getById(id);
		
		ResponseEntity<Object> check = checkExists(annuncioObj);
		if(check != null) return check;
		
		// rimuovi la l'annuncio con quell'id che sta anche nella lista dei preferiti di ogni utente
		List<Utente> utentiConPreferiti = us.getPreferitiAggiunti(annuncioObj.get());
		for(Utente utente : utentiConPreferiti) {
			utente.getPreferiti().remove(annuncioObj.get());
			us.save(utente);
		}
		
		List<Foto> fotoAnnuncio = fs.getFotoAnnuncio(annuncioObj.get());
		for(Foto foto : fotoAnnuncio) {
			fs.delete(foto);
		}
		
		as.delete(annuncioObj.get());
		
		return new ResponseEntity<>(
			String.format("L'annuncio con id %d è stato eliminato!", id), HttpStatus.OK	
		);
	}
	
	//FILTRI
	
	@GetMapping("annunci/cercaMarca")
	public List<Annuncio> getAllAnnunciByMarca(@RequestParam("marca") String marca) {
		return as.findByMarca(marca);
	}
	
	@GetMapping("annunci/cercaModello")
	public List<Annuncio> getAllAnnunciByModello(@RequestParam("modello") String modello) {
		return as.findByModello(modello);
	}
	
	@GetMapping("annunci/cercaImmatricolazione")
	public List<Annuncio> getAllAnnunciByAnnoImmatricolazione(@RequestParam("min") String min, @RequestParam("max") String max) {
		return as.findByAnnoImmatricolazione(min, max);
	}
	
	@GetMapping("annunci/cercaKilometri")
	public List<Annuncio> getAllAnnunciByKilometri(@RequestParam("min") long min, @RequestParam("max") long max) {
		return as.findByKilometri(min, max);
	}
	
	@GetMapping("annunci/cercaPrezzo")
	public List<Annuncio> getAllAnnunciByPrezzo(@RequestParam("prezzo") double prezzo) {
		return as.findByPrezzo(prezzo);
	}
	
	private ResponseEntity<Object> checkExists(Optional<Annuncio> obj) {
		if( !obj.isPresent() ) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return null;
	}
	
}
