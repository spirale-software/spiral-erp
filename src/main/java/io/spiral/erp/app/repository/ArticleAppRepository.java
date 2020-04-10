package io.spiral.erp.app.repository;

import io.spiral.erp.jhipster.domain.Article;
import io.spiral.erp.jhipster.repository.ArticleRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ArticleAppRepository extends ArticleRepository, JpaSpecificationExecutor<Article> {
}
