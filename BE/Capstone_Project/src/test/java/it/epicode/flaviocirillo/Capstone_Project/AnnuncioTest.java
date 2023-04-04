package it.epicode.flaviocirillo.Capstone_Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import it.epicode.flaviocirillo.Capstone_Project.entities.Annuncio;
import it.epicode.flaviocirillo.Capstone_Project.services.AnnuncioService;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

@SpringBootTest
public class AnnuncioTest {

	@Autowired
	private AnnuncioService as;
	
	@Test
	public void testSave() {
		
		Annuncio annuncio = new Annuncio();
		annuncio.setMarca("Yamaha");
		annuncio.setModello("yzf-r1");
		annuncio.setCilindrata(999);
		annuncio.setCavalli(140);
		annuncio.setKilometri(30000L);
		annuncio.setImmatricolazione("2022");
		annuncio.setLocalita("Roma");
		annuncio.setPrezzo(10000.00);
		annuncio.setDescrizione("Descrizione Prova 1");
		
		as.save(annuncio);
	    
	    Optional<Annuncio> recuperaAnnuncio = as.getById(annuncio.getId());
	    
	    assertTrue(recuperaAnnuncio.isPresent());
	    assertEquals("Yamaha", recuperaAnnuncio.get().getMarca());
	    assertEquals("yzf-r1", recuperaAnnuncio.get().getModello());
	    assertEquals("Roma", recuperaAnnuncio.get().getLocalita());
	    assertEquals("Descrizione Prova 1", recuperaAnnuncio.get().getDescrizione());
	    assertEquals("2022", recuperaAnnuncio.get().getImmatricolazione());
	    
	    as.delete(annuncio);
	}
	
	@Test
	public void testDelete() {
		Annuncio annuncio = new Annuncio();
		annuncio.setMarca("Yamaha");
		annuncio.setModello("yzf-r1");
		annuncio.setCilindrata(999);
		annuncio.setCavalli(140);
		annuncio.setKilometri(30000L);
		annuncio.setImmatricolazione("2022");
		annuncio.setLocalita("Roma");
		annuncio.setPrezzo(10000.00);
		annuncio.setDescrizione("Descrizione Prova 1");
		
		as.save(annuncio);

	    as.getById(annuncio.getId());

	    as.delete(annuncio);
		
	    Optional<Annuncio> recuperaAnnuncio = as.getById(annuncio.getId());
	    
		assertTrue(recuperaAnnuncio.isEmpty());
	}
	
	@Test
	public void testGetAll() {
		List<Annuncio> annunci = as.getAll();
		
		//inserire il numero di elementi presenti nel database.
		assertEquals(1, annunci.size());
	}
	
	@Test
	public void testUpdate() {
		Annuncio annuncio = new Annuncio();
		annuncio.setMarca("Yamaha");
		annuncio.setModello("yzf-r1");
		annuncio.setCilindrata(999);
		annuncio.setCavalli(140);
		annuncio.setKilometri(30000L);
		annuncio.setImmatricolazione("2022");
		annuncio.setLocalita("Roma");
		annuncio.setPrezzo(10000.00);
		annuncio.setDescrizione("Descrizione Prova 1");
		
		as.save(annuncio);

	    Optional<Annuncio> recuperaAnnuncio = as.getById(annuncio.getId());

	    assertTrue(recuperaAnnuncio.isPresent());
	    
	    Annuncio a1 = recuperaAnnuncio.get();
	    a1.setDescrizione("Descrizione Prova 2");
	    
	    as.save(a1);
	    
	    assertEquals("Yamaha", recuperaAnnuncio.get().getMarca());
	    
	    as.delete(annuncio);
	}
	
}
