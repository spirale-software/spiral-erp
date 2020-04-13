package io.spiral.erp.app.service.mapper;

import io.spiral.erp.app.service.dto.ArticleDTO;
import io.spiral.erp.app.service.utils.AuditBuilder;
import io.spiral.erp.jhipster.domain.Article;

import io.spiral.erp.jhipster.repository.AuditRepository;
import io.spiral.erp.jhipster.service.mapper.AuditMapper;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", uses = {AuditMapper.class, FournisseurMapper.class})
public abstract class ArticleMapper implements EntityMapper<ArticleDTO, Article> {
    @Autowired
    private AuditRepository auditRepository;

    @BeforeMapping
    public void executeBeforeMapping(ArticleDTO articleDTO) {
        if (articleDTO.getAudit() == null) {
            articleDTO.setAudit(AuditBuilder.buildAuditFromNow());
        }
    }

    @AfterMapping
    public void executeAfterMapping(@MappingTarget Article article) {
        article.setAudit(auditRepository.save(article.getAudit()));
    }

    @Mapping(source = "audit.createdAt", target = "audit.createdAt")
    @Mapping(source = "audit.modifiedAt", target = "audit.modifiedAt")
    public abstract Article toEntity(ArticleDTO dto);
}
