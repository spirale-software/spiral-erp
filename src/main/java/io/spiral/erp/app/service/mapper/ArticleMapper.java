package io.spiral.erp.app.service.mapper;

import io.spiral.erp.app.service.dto.ArticleDTO;
import io.spiral.erp.jhipster.domain.Article;

import io.spiral.erp.jhipster.service.mapper.AuditMapper;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {AuditMapper.class})
public interface ArticleMapper extends EntityMapper<ArticleDTO, Article> {

    @Mapping(source = "audit.createdAt", target = "audit.createdAt", defaultExpression = "java(java.time.ZonedDateTime.now())")
    @Mapping(source = "audit.modifiedAt", target = "audit.modifiedAt", defaultExpression = "java(java.time.ZonedDateTime.now())")
    Article toEntity(ArticleDTO dto);

}
