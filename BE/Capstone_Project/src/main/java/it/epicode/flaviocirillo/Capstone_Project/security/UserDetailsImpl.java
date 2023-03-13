package it.epicode.flaviocirillo.Capstone_Project.security;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.epicode.flaviocirillo.Capstone_Project.entities.Concessionario;
import it.epicode.flaviocirillo.Capstone_Project.entities.Utente;
import lombok.Data;

@Data
public class UserDetailsImpl implements UserDetails {

	private int id;
	private String email;
	private String username;
	
	@JsonIgnore
	private String password;
	
	private boolean accountNonLocked = true;
	private boolean accountNonExpired = false;
	private boolean credentialsNonExpired = true;
	private boolean enabled = true;
	private Date expirationTime;
	
	private Collection<? extends GrantedAuthority> authorities;
	
	public UserDetailsImpl(int id, String username, String email, String password, boolean enable, Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.accountNonLocked = enable;
		this.accountNonExpired = enable;
		this.credentialsNonExpired = enable;
		this.enabled = enable;
		this.authorities = authorities;
	}

	public static UserDetailsImpl build(Utente user) {
		List<GrantedAuthority> authorities = user.getRuoli().stream()
				.map(role -> new SimpleGrantedAuthority(role.getTipoRuolo().name())).collect(Collectors.toList());
		return new UserDetailsImpl(user.getId(), user.getUsername(), user.getEmail(), user.getPassword(), user.isAttivo(), authorities);
	}
	
	public static UserDetailsImpl build(Concessionario concessionario) {
		List<GrantedAuthority> authorities = concessionario.getRuoli().stream()
				.map(role -> new SimpleGrantedAuthority(role.getTipoRuolo().name())).collect(Collectors.toList());
		return new UserDetailsImpl(concessionario.getId(), concessionario.getUsername(), concessionario.getEmail(), concessionario.getPassword(), concessionario.isAttivo(), authorities);
	}
	
}
