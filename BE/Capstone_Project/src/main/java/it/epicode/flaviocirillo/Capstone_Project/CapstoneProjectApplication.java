package it.epicode.flaviocirillo.Capstone_Project;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import it.epicode.flaviocirillo.Capstone_Project.config.Beans;
import it.epicode.flaviocirillo.Capstone_Project.entities.Concessionario;
import it.epicode.flaviocirillo.Capstone_Project.entities.Ruolo;
import it.epicode.flaviocirillo.Capstone_Project.entities.TipoRuolo;
import it.epicode.flaviocirillo.Capstone_Project.entities.Utente;
import it.epicode.flaviocirillo.Capstone_Project.services.ConcessionarioService;
import it.epicode.flaviocirillo.Capstone_Project.services.RuoloService;
import it.epicode.flaviocirillo.Capstone_Project.services.UtenteService;

@SpringBootApplication
public class CapstoneProjectApplication implements CommandLineRunner {
	
	ApplicationContext ctx = new AnnotationConfigApplicationContext(Beans.class);

	public static void main(String[] args) {
		SpringApplication.run(CapstoneProjectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
//		popolaDB_Utenti();
		
		((AnnotationConfigApplicationContext)ctx).close();
	}
	
	@Autowired
	private UtenteService us;
	
	@Autowired
	private RuoloService rs;
	
	@Autowired
	private ConcessionarioService cs;
	
	public void popolaDB_Utenti() {
		Ruolo r1 = (Ruolo)ctx.getBean("ruolo", TipoRuolo.ROLE_ADMIN);
		Ruolo r2 = (Ruolo)ctx.getBean("ruolo", TipoRuolo.ROLE_USER);
		
		Utente u1 = (Utente)ctx.getBean("utente", "Mario", "Rossi", "Mario1234", "mario.rossi@gmail.com", "mrossi"); 
		Utente u2 = (Utente)ctx.getBean("utente", "Flavio", "Cirillo", "Flavio1234", "flavio.cirillo@gmail.com", "fcirillo"); 
		
		Concessionario c1 = (Concessionario)ctx.getBean("concessionario", "MotorShop", "12345678900", "Viale Marconi 10", "00146", "Roma", "motorshop@info.com", "Motorshop", "MotorShop1234", "+39 3390137889");
		
		rs.save(r1);
		rs.save(r2);
		
		u1.setRuoli(new HashSet<>() {{
			add(r1);
		}});
		
		u2.setRuoli(new HashSet<>() {{
			add(r1);
		}});
		
		us.save(u1);
		us.save(u2);
		
		c1.setRuoli(new HashSet<>() {{
			add(r2);
		}});
		
		cs.save(c1);
		
		System.out.println("Db popolato");
		
	}

}
