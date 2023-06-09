package it.epicode.flaviocirillo.Capstone_Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import it.epicode.flaviocirillo.Capstone_Project.entities.Utente;
import it.epicode.flaviocirillo.Capstone_Project.services.UtenteService;

@SpringBootTest
public class UtenteTest {

	@Autowired
	private UtenteService us;
	
	@Test
	public void testSave() {
	    Utente utente = new Utente();
	    utente.setUsername("test");
	    utente.setEmail("test@m.it");
	    utente.setPassword("test");
	    utente.setNome("Nome");
	    utente.setCognome("Cognome");
	    	    
	    us.save(utente);
	    
	    Optional<Utente> recuperaUtente = us.getById(utente.getId());
	    
	    assertTrue(recuperaUtente.isPresent());
	    assertEquals("test", recuperaUtente.get().getUsername());
	    assertEquals("test@m.it", recuperaUtente.get().getEmail());
	    assertEquals("test", recuperaUtente.get().getPassword());
	    assertEquals("Nome", recuperaUtente.get().getNome());
	    assertEquals("Cognome", recuperaUtente.get().getCognome());
	    
	    us.delete(utente);
	}
	
	@Test
	public void testDelete() {
		Utente utente = new Utente();
	    utente.setUsername("test");
	    utente.setEmail("test@m.it");
	    utente.setPassword("test");
	    utente.setNome("Nome");
	    utente.setCognome("Cognome");

	    us.save(utente);

	    us.getById(utente.getId());

	    us.delete(utente);
		
	    Optional<Utente> recuperaUtente = us.getById(utente.getId());
	    
		assertTrue(recuperaUtente.isEmpty());
	}
	
	@Test
	public void testGetAll() {
		List<Utente> utenti = us.getAll();
		
		//inserire il numero di elementi presenti nel database.
		assertEquals(3, utenti.size());
	}
	
	@Test
	public void testUpdate() {
		Utente utente = new Utente();
	    utente.setUsername("test");
	    utente.setEmail("test@m.it");
	    utente.setPassword("test");
	    utente.setNome("Nome");
	    utente.setCognome("Cognome");

	    us.save(utente);

	    Optional<Utente> recuperaUtente = us.getById(utente.getId());

	    assertTrue(recuperaUtente.isPresent());
	    
	    Utente u1 = recuperaUtente.get();
	    u1.setPassword("test123");
	    
	    us.save(u1);
	    
	    assertEquals("test123", recuperaUtente.get().getPassword());
	    
	    us.delete(utente);
	}
	
}
