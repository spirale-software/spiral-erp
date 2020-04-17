package io.spiral.erp.app.repository;

import io.spiral.erp.jhipster.domain.Utilisateur;
import io.spiral.erp.jhipster.repository.UtilisateurRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtilisateurAppRepository extends UtilisateurRepository, JpaSpecificationExecutor<Utilisateur> {
    public Optional<Utilisateur> findByJhiUserLogin(String login);
}
