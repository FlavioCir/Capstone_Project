package it.epicode.flaviocirillo.Capstone_Project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.epicode.flaviocirillo.Capstone_Project.entities.Annuncio;

@Repository
public interface AnnuncioRepo extends JpaRepository<Annuncio, Integer> {
	
	// filtra gli annunci per marca della moto
	@Query(
			nativeQuery = true,
			value = "SELECT * FROM annunci WHERE LOWER(marca) LIKE LOWER(CONCAT('%', :fn, '%'))"
		)
	List<Annuncio> findByMarca(@Param("fn") String marca);
		
		
	// filtra gli annunci per modello della moto
	@Query(
			nativeQuery = true,
			value = "SELECT * FROM annunci WHERE LOWER(modello) LIKE LOWER(CONCAT('%', :fn, '%'))"
		)
	List<Annuncio> findByModello(@Param("fn") String modello);
	
	
	// filtra gli annunci che hanno l'anno d'immatricolazione tra min e max
	@Query(
			nativeQuery = true,
			value = "SELECT * FROM annunci a WHERE a.immatricolazione BETWEEN :min AND :max"
		)
	List<Annuncio> findByAnnoImmatricolazione(@Param("min") String min, @Param("max") String max);
	
	
	// filtra gli annunci che hanno i kilometri tra min e max
	@Query(
			nativeQuery = true,
			value = "SELECT * FROM annunci a WHERE a.kilometri BETWEEN :min AND :max"
		)
	List<Annuncio> findByKilometri(@Param("min") long min, @Param("max") long max);
	
	// filtra gli annunci che hanno il prezzo minore e uguale a quello inserito
	@Query(
			nativeQuery = true,
			value = "SELECT * FROM annunci a WHERE a.prezzo <= :fn"
		)
	List<Annuncio> findByPrezzo(@Param("fn") double prezzo);
	
}
