package io.spiral.erp.app.service;

import io.github.jhipster.service.filter.StringFilter;
import io.spiral.erp.jhipster.domain.Utilisateur;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class UtilisateurQueryService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    public Specification<Utilisateur> createSpecification(String critereTransversal) {
        log.info("Création de la spécification à partir du critère transversal: {}", critereTransversal);
        Specification<Utilisateur> specification = null;
        if (critereTransversal != null) {
            StringFilter filter = new StringFilter();
            filter.setContains(critereTransversal);
//            specification = Specification
//                .where(buildStringSpecification(filter, Utilisateur_.nom))
//                .or(buildStringSpecification(filter, Article_.code));
        }
        return specification;
    }
}
