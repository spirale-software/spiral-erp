package io.spiral.erp.app.repository;

import io.spiral.erp.jhipster.domain.Vente;
import io.spiral.erp.jhipster.repository.VenteRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface VenteAppRepository extends VenteRepository, JpaSpecificationExecutor<Vente> {
}
