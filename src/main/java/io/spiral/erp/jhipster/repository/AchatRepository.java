package io.spiral.erp.jhipster.repository;

import io.spiral.erp.jhipster.domain.Achat;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Achat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AchatRepository extends JpaRepository<Achat, Long> {

}
