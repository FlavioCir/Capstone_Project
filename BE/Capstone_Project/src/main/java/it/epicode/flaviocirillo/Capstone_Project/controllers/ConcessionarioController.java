package it.epicode.flaviocirillo.Capstone_Project.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import it.epicode.flaviocirillo.Capstone_Project.entities.Concessionario;
import it.epicode.flaviocirillo.Capstone_Project.entities.Ruolo;
import it.epicode.flaviocirillo.Capstone_Project.services.ConcessionarioService;
import it.epicode.flaviocirillo.Capstone_Project.services.RuoloService;

@RestController
@RequestMapping("/")
public class ConcessionarioController {

	@Autowired
	private ConcessionarioService cs;
	
	@Autowired
	PasswordEncoder pwEncoder;
	
	@GetMapping("concessionari")
	public ResponseEntity<List<Concessionario>> getConcessionari() {
		List<Concessionario> concessionario = cs.getAll();
		
		return new ResponseEntity<>(concessionario, HttpStatus.CREATED);
	}
	
	@GetMapping("concessionari/{id}")
	public ResponseEntity<Object> getConcessionariById(@PathVariable int id) {
		Optional<Concessionario> concessionarioObj = cs.getById(id);
		
		ResponseEntity<Object> check = checkExists(concessionarioObj);
		if(check != null) return check;
		
		return new ResponseEntity<>(concessionarioObj.get(), HttpStatus.OK);
	}
	
	@GetMapping("concessionari_page")
	public ResponseEntity<Object> getUtentiInPages(Pageable pageable) {
		Page<Concessionario> concessionari = cs.getAll_page(pageable);
		
		if(concessionari.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>(concessionari, HttpStatus.OK);
	}
	
	// Metodo per criptare la password dei concessionari
	@GetMapping("auth/update_shop_pw")
	@ResponseBody
	public String auth_update_user_pw() {
		int id = 1;
		
		Concessionario c = cs.getById(id).get();
		String pw = c.getPassword();
		c.setPassword( pwEncoder.encode(pw) );
		cs.save(c);
		
		return "Concessionario aggiornato";
	}
	
	@Autowired
	RuoloService rs;
	
	@PostMapping("concessionari")
	public ResponseEntity<Object> createConcessionario(@RequestBody Concessionario c) {
		String password = c.getPassword();
		Optional<Ruolo> shopOp = rs.getById(2);
		Ruolo shop = shopOp.get();
		c.setRuoli(new HashSet<>() {{
			add(shop);
		}});
		c.setPassword(pwEncoder.encode(password));
		Concessionario concessionario = cs.save(c);
		
		return new ResponseEntity<Object>(concessionario, HttpStatus.CREATED);
	}
	
	@PutMapping("concessionari/{id}")
	public ResponseEntity<Object> updateConcessionario(@PathVariable int id, @RequestBody Concessionario _concessionario) {
		Optional<Concessionario> concessionarioObj = cs.getById(id);
		
		ResponseEntity<Object> check = checkExists(concessionarioObj);
		if(check != null) return check;
		
		Concessionario concessionario = concessionarioObj.get();
		
		concessionario.setRagioneSociale(_concessionario.getRagioneSociale());
		concessionario.setPartitaIva(_concessionario.getPartitaIva());
		concessionario.setIndirizzo(_concessionario.getIndirizzo());
		concessionario.setCap(_concessionario.getCap());
		concessionario.setLocalita(_concessionario.getLocalita());
		concessionario.setEmail(_concessionario.getEmail());
		concessionario.setPassword(_concessionario.getPassword());
		concessionario.setTelefono(_concessionario.getTelefono());
		
		cs.save(concessionario);
		
		return new ResponseEntity<Object>(concessionario, HttpStatus.CREATED);
	}
	
	@DeleteMapping("concessionari/{id}")
	public ResponseEntity<Object> deleteConcessionario(@PathVariable int id) {
		Optional<Concessionario> concessionarioObj = cs.getById(id);
		
		ResponseEntity<Object> check = checkExists(concessionarioObj);
		if(check != null) return check;
		
		cs.delete(concessionarioObj.get());
		
		return new ResponseEntity<>(
			String.format("Il concessionario con id %d è stato eliminato!", id), HttpStatus.OK	
		);
	}
	
	private ResponseEntity<Object> checkExists(Optional<Concessionario> obj) {
		if( !obj.isPresent() ) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return null;
	}
	
}
