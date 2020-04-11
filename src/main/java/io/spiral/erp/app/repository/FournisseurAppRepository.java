package io.spiral.erp.app.repository;

import io.spiral.erp.jhipster.domain.Fournisseur;
import io.spiral.erp.jhipster.repository.FournisseurRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface FournisseurAppRepository extends FournisseurRepository, JpaSpecificationExecutor<Fournisseur> {
}
