package io.spiral.erp.app.service.mapper;

import io.spiral.erp.app.service.ArticleAppService;
import io.spiral.erp.app.service.UtilisateurAppService;
import io.spiral.erp.app.service.dto.AchatDTO;
import io.spiral.erp.jhipster.domain.Achat;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UtilisateurAppService.class, ArticleAppService.class})
public interface AchatMapper extends EntityMapper<AchatDTO, Achat> {

    @Mapping(source = "loginAcheteur", target = "acheteur", qualifiedByName = "getUtilisateurByLogin")
    @Mapping(source = "idArticle", target = "article", qualifiedByName = "getArticleById")
    Achat toEntity(AchatDTO dto);

    @Mapping(source = "acheteur.id", target = "idAcheteur")
    @Mapping(source = "acheteur.jhiUser.login", target = "loginAcheteur")
    @Mapping(source = "acheteur.jhiUser.lastName ", target = "nomAcheteur")
    @Mapping(source = "article.id ", target = "idArticle")
    @Mapping(source = "article.nom", target = " nomArticle")
    AchatDTO toDto(Achat entity);

}
