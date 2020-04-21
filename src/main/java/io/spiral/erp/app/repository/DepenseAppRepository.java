package io.spiral.erp.app.repository;

import io.spiral.erp.jhipster.domain.Depense;
import io.spiral.erp.jhipster.repository.DepenseRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface DepenseAppRepository extends DepenseRepository, JpaSpecificationExecutor<Depense> {
}
