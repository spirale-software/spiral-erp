package io.spiral.erp.jhipster.service.mapper;

import io.spiral.erp.jhipster.domain.*;
import io.spiral.erp.jhipster.service.dto.ArticleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Article} and its DTO {@link ArticleDTO}.
 */
@Mapper(componentModel = "spring", uses = {AuditMapper.class, EntrepriseMapper.class})
public interface ArticleMapper extends EntityMapper<ArticleDTO, Article> {

    @Mapping(source = "audit.id", target = "auditId")
    @Mapping(source = "entreprise.id", target = "entrepriseId")
    ArticleDTO toDto(Article article);

    @Mapping(source = "auditId", target = "audit")
    @Mapping(source = "entrepriseId", target = "entreprise")
    Article toEntity(ArticleDTO articleDTO);

    default Article fromId(Long id) {
        if (id == null) {
            return null;
        }
        Article article = new Article();
        article.setId(id);
        return article;
    }
}
