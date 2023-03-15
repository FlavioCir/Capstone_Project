package it.epicode.flaviocirillo.Capstone_Project.security;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.epicode.flaviocirillo.Capstone_Project.entities.Utente;
import lombok.Data;

@Data
public class UserDetailsImpl implements UserDetails {

	private int id;
	private String username;
	private String email;
	
	private String nome;
	private String cognome;
	private String ragioneSociale;
	
	@JsonIgnore
	private String password;
	
	private boolean accountNonLocked = true;
	private boolean accountNonExpired = false;
	private boolean credentialsNonExpired = true;
	private boolean enabled = true;
	private Date expirationTime;

	private Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImpl(int id, String username, String email, String nome, String cognome, String ragioneSociale, String password, boolean enabled, Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.email = email;
		
		this.nome = nome;
		this.cognome = cognome;
		this.ragioneSociale = ragioneSociale;
		
		this.password = password;
		this.accountNonLocked = enabled;
		this.accountNonExpired = enabled;
		this.credentialsNonExpired = enabled;
		this.enabled = enabled;
		this.authorities = authorities;
	}

	public static UserDetailsImpl build(Utente user) {
		List<GrantedAuthority> authorities = user.getRuoli().stream()
				.map(role -> new SimpleGrantedAuthority(role.getTipoRuolo().name())).collect(Collectors.toList());
		return new UserDetailsImpl(user.getId(), user.getUsername(), user.getEmail(), user.getNome(), user.getCognome(), user.getRagioneSociale(), user.getPassword(),
				user.isAttivo(), authorities);
	}
	
}
