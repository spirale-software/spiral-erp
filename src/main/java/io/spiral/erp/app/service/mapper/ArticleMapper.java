package io.spiral.erp.app.service.mapper;

import io.spiral.erp.jhipster.domain.Article;
import io.spiral.erp.jhipster.service.dto.ArticleDTO;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface ArticleMapper extends EntityMapper<ArticleDTO, Article> {
}
