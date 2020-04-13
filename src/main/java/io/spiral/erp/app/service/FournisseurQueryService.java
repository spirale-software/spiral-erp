package io.spiral.erp.app.service;

import io.github.jhipster.service.QueryService;
import io.github.jhipster.service.filter.StringFilter;
import io.spiral.erp.jhipster.domain.Fournisseur;
import io.spiral.erp.jhipster.domain.Fournisseur_;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class FournisseurQueryService extends QueryService<Fournisseur> {
    private final Logger log = LoggerFactory.getLogger(getClass());

    public Specification<Fournisseur> createSpecification(String critereTransversal) {
        log.info("Création de la spécification à partir du critère transversal: {}", critereTransversal);
        Specification<Fournisseur> specification = null;
        if (critereTransversal != null) {
            StringFilter filter = new StringFilter();
            filter.setContains(critereTransversal);
            specification = Specification
                .where(buildStringSpecification(filter, Fournisseur_.nom))
                .or(buildStringSpecification(filter, Fournisseur_.adresse))
                .or(buildStringSpecification(filter, Fournisseur_.telephone));
        }
        return specification;
    }
}
