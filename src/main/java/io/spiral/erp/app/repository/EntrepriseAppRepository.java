package io.spiral.erp.app.repository;

import io.spiral.erp.jhipster.domain.Entreprise;
import io.spiral.erp.jhipster.repository.EntrepriseRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EntrepriseAppRepository extends EntrepriseRepository, JpaSpecificationExecutor<Entreprise> {
}
