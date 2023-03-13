package it.epicode.flaviocirillo.Capstone_Project.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.epicode.flaviocirillo.Capstone_Project.entities.Concessionario;
import it.epicode.flaviocirillo.Capstone_Project.entities.Utente;
import it.epicode.flaviocirillo.Capstone_Project.repositories.ConcessionarioRepo;
import it.epicode.flaviocirillo.Capstone_Project.repositories.UtenteRepo;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	UtenteRepo userRepository;
	
	@Autowired
	ConcessionarioRepo concessionarioRepository;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Utente> user = userRepository.findByUsername(username);
		Optional<Concessionario> concessionario = concessionarioRepository.findByUsername(username);
		
		if(user.isPresent()) {
			return UserDetailsImpl.build(user.get());
		} else {
			throw new UsernameNotFoundException("Utente con username: " + username + " non trovato");
		}
		
		if(concessionario.isPresent()) {
			return UserDetailsImpl.build(concessionario.get());
		} else {
			throw new UsernameNotFoundException("Concessionario con username " + username + " non trovato");
		}
	}		
	
}
