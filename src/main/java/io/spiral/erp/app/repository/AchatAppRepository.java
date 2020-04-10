package io.spiral.erp.app.repository;

import io.spiral.erp.jhipster.domain.Achat;
import io.spiral.erp.jhipster.repository.AchatRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AchatAppRepository extends AchatRepository, JpaSpecificationExecutor<Achat> {
}
