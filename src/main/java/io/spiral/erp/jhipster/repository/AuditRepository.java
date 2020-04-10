package io.spiral.erp.jhipster.repository;

import io.spiral.erp.jhipster.domain.Audit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Audit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuditRepository extends JpaRepository<Audit, Long> {

}
