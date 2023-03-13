package it.epicode.flaviocirillo.Capstone_Project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.epicode.flaviocirillo.Capstone_Project.entities.Annuncio;

@Repository
public interface AnnuncioRepo extends JpaRepository<Annuncio, Integer> {

	List<Annuncio> findByAnnoImmatricolazione(@Param("min") String min, @Param("max") String max);
	List<Annuncio> findByKilometri(@Param("min") long min, @Param("max") long max);
	List<Annuncio> findByPrezzo(double prezzo);
	
	@Query(
			nativeQuery = true,
			value = "SELECT * FROM annunci WHERE LOWER(marca) LIKE LOWER(CONCAT('%', :fn, '%'))"
		)
	List<Annuncio> findByMarca(@Param("fn") String marca);
	
	@Query(
			nativeQuery = true,
			value = "SELECT * FROM annunci WHERE LOWER(modello) LIKE LOWER(CONCAT('%', :fn, '%'))"
			)
	List<Annuncio> findByModello(@Param("fn") String modello);
}
