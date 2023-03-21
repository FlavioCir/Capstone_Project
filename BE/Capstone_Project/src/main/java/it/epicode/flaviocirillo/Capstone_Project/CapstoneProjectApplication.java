package it.epicode.flaviocirillo.Capstone_Project;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import it.epicode.flaviocirillo.Capstone_Project.config.Beans;
import it.epicode.flaviocirillo.Capstone_Project.entities.Annuncio;
import it.epicode.flaviocirillo.Capstone_Project.entities.Foto;
import it.epicode.flaviocirillo.Capstone_Project.entities.Ruolo;
import it.epicode.flaviocirillo.Capstone_Project.entities.StatoDelVeicolo;
import it.epicode.flaviocirillo.Capstone_Project.entities.TipoRuolo;
import it.epicode.flaviocirillo.Capstone_Project.entities.TipologiaMoto;
import it.epicode.flaviocirillo.Capstone_Project.entities.StatoVeicolo;
import it.epicode.flaviocirillo.Capstone_Project.entities.TipoMoto;
import it.epicode.flaviocirillo.Capstone_Project.entities.Utente;
import it.epicode.flaviocirillo.Capstone_Project.services.AnnuncioService;
import it.epicode.flaviocirillo.Capstone_Project.services.FotoService;
import it.epicode.flaviocirillo.Capstone_Project.services.RuoloService;
import it.epicode.flaviocirillo.Capstone_Project.services.StatoDelVeicoloService;
import it.epicode.flaviocirillo.Capstone_Project.services.TipologiaMotoService;
import it.epicode.flaviocirillo.Capstone_Project.services.UtenteService;

@SpringBootApplication
public class CapstoneProjectApplication implements CommandLineRunner {
	
	ApplicationContext ctx = new AnnotationConfigApplicationContext(Beans.class);

	public static void main(String[] args) {
		SpringApplication.run(CapstoneProjectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
//		popolaDB();
		
		((AnnotationConfigApplicationContext)ctx).close();
	}
	
	@Autowired
	private UtenteService us;
	
	@Autowired
	private RuoloService rs;
	
	@Autowired
	private AnnuncioService as;
	
	@Autowired
	private FotoService fs;
	
	@Autowired
	private TipologiaMotoService ts;
	
	@Autowired
	private StatoDelVeicoloService ss;
	
	public void popolaDB() {
		Ruolo r1 = (Ruolo)ctx.getBean("ruolo", TipoRuolo.ROLE_ADMIN);
		Ruolo r2 = (Ruolo)ctx.getBean("ruolo", TipoRuolo.ROLE_USER);
		
		Utente u1 = (Utente)ctx.getBean("utente", "Mario", "Rossi", "Mario1234", "mario.rossi@gmail.com", "mrossi"); 
		Utente u2 = (Utente)ctx.getBean("utente", "Flavio", "Cirillo", "Flavio1234", "flavio.cirillo@gmail.com", "fcirillo"); 
		
		Utente u3 = (Utente)ctx.getBean("concessionario", "MotorShop srl", "12345678900", "Viale Marconi 100", "00146", "Roma", "+39 3380811347", "Motorshop!", "motorshop@info.com", "motorShop");
		
		rs.save(r1);
		rs.save(r2);
		
		u1.setRuoli(new HashSet<>() {{
			add(r2);
		}});
		
		u2.setRuoli(new HashSet<>() {{
			add(r2);
		}});
		
		u3.setRuoli(new HashSet<>() {{
			add(r1);
		}});
		
		us.save(u1);
		us.save(u2);
		us.save(u3);
		
		StatoDelVeicolo s1 = (StatoDelVeicolo)ctx.getBean("statoVeicolo", StatoVeicolo.NUOVO);
		StatoDelVeicolo s2 = (StatoDelVeicolo)ctx.getBean("statoVeicolo", StatoVeicolo.USATO);
		
		TipologiaMoto t1 = (TipologiaMoto)ctx.getBean("tipologiaMoto", TipoMoto.NAKED);
		TipologiaMoto t2 = (TipologiaMoto)ctx.getBean("tipologiaMoto", TipoMoto.SUPERSPORTIVA);
		TipologiaMoto t3 = (TipologiaMoto)ctx.getBean("tipologiaMoto", TipoMoto.ADVENTURE);
		TipologiaMoto t4 = (TipologiaMoto)ctx.getBean("tipologiaMoto", TipoMoto.TOURING);
		TipologiaMoto t5 = (TipologiaMoto)ctx.getBean("tipologiaMoto", TipoMoto.ENDURO);
		TipologiaMoto t6 = (TipologiaMoto)ctx.getBean("tipologiaMoto", TipoMoto.CRUISER);
		TipologiaMoto t7 = (TipologiaMoto)ctx.getBean("tipologiaMoto", TipoMoto.MOTARD);
		
		ss.save(s1);
		ss.save(s2);
		
		ts.save(t1);
		ts.save(t2);
		ts.save(t3);
		ts.save(t4);
		ts.save(t5);
		ts.save(t6);
		ts.save(t7);
		
//		Annuncio a1 = (Annuncio)ctx.getBean("annuncio", "Yamaha", "yzf-r1", 1000, 150, 12000L, "2022", "Roma", 10000.00, "Descrizione Prova 1", u3);
//		Annuncio a2 = (Annuncio)ctx.getBean("annuncio", "Suzuki", "gsx-r", 600, 100, 15000L, "2022", "Milano", 6000.00, "Descrizione Prova 2", u3);
//		
//		as.save(a1);
//		as.save(a2);
//		
//		Foto f1 = (Foto)ctx.getBean("foto", "url1");
//		Foto f2 = (Foto)ctx.getBean("foto", "url2");
//		Foto f3 = (Foto)ctx.getBean("foto", "url3");
//		
//		f1.setAnnuncio(a1);
//		f2.setAnnuncio(a1);
//		f3.setAnnuncio(a2);
//		
//		fs.save(f1);
//		fs.save(f2);
//		fs.save(f3);
//		
//		a1.setFoto(new HashSet<>() {{
//			add(f1);
//			add(f2);
//		}});
//		
//		a2.setFoto(new HashSet<>() {{
//			add(f3);
//		}});
//		
//		as.save(a1);
//		as.save(a2);
		
		System.out.println("Db popolato");
		
	}

}
