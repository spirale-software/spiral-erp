package io.spiral.erp.app.service;

import io.github.jhipster.service.QueryService;
import io.spiral.erp.jhipster.domain.Article;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class ArticleQueryService extends QueryService<Article> {
    private final Logger log = LoggerFactory.getLogger(getClass());

    public Specification<Article> createSpecification(String critereTransversal) {
        log.info("Création de la spécification à partir du critère transversal: {}", critereTransversal);
        Specification<Article> specification = Specification.where(null);
        return specification;
    }
}
