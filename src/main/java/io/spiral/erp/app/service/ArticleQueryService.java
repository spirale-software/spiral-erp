package io.spiral.erp.app.service;

import io.github.jhipster.service.QueryService;
import io.github.jhipster.service.filter.StringFilter;
import io.spiral.erp.jhipster.domain.Article;
import io.spiral.erp.jhipster.domain.Article_;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class ArticleQueryService extends QueryService<Article> {
    private final Logger log = LoggerFactory.getLogger(getClass());

    public Specification<Article> createSpecification(String critereTransversal) {
        log.info("Création de la spécification à partir du critère transversal: {}", critereTransversal);
        Specification<Article> specification = null;
        if (critereTransversal != null) {
            StringFilter filter = new StringFilter();
            filter.setContains(critereTransversal);
            specification = Specification
                .where(buildStringSpecification(filter, Article_.nom))
                .or(buildStringSpecification(filter, Article_.code));
        }
        return specification;
    }
}
