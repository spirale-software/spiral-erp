package io.spiral.erp.app.service;

import io.github.jhipster.service.QueryService;
import io.spiral.erp.jhipster.domain.Achat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class AchatQueryService extends QueryService<Achat> {
    private final Logger log = LoggerFactory.getLogger(getClass());

    public Specification<Achat> createSpecification(String critereTransversal) {
        log.info("Création de la spécification à partir du critère transversal: {}", critereTransversal);
        Specification<Achat> specification = Specification.where(null);
        return specification;
    }
}
