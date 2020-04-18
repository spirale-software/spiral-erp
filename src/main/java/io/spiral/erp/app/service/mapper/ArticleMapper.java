package io.spiral.erp.app.service.mapper;

import io.spiral.erp.app.service.dto.ArticleDTO;
import io.spiral.erp.jhipster.domain.Article;

import io.spiral.erp.jhipster.service.mapper.AuditMapper;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {AuditMapper.class, FournisseurMapper.class})
public interface ArticleMapper extends EntityMapper<ArticleDTO, Article> {

    public Article toEntity(ArticleDTO dto);
}
