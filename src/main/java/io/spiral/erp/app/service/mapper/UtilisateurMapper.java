package io.spiral.erp.app.service.mapper;

import io.spiral.erp.app.service.EntrepriseAppService;
import io.spiral.erp.app.service.dto.UtilisateurDTO;
import io.spiral.erp.jhipster.domain.Utilisateur;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {EntrepriseAppService.class})
public interface UtilisateurMapper extends EntityMapper<UtilisateurDTO, Utilisateur> {

    @Mapping(source = "idJhiUser", target = "jhiUser.id")
    @Mapping(source = "login", target = "jhiUser.login")
    @Mapping(source = "password", target = "jhiUser.password")
    @Mapping(source = "prenom", target = "jhiUser.firstName")
    @Mapping(source = "nom", target = "jhiUser.lastName")
    @Mapping(source = "email", target = "jhiUser.email")
    @Mapping(source = "actif", target = "jhiUser.activated")
    @Mapping(source = "idEntreprise", target = "entreprise", qualifiedByName = "getEntrepriseById")
    Utilisateur toEntity(UtilisateurDTO dto);

    @Mapping(source = "jhiUser.id ", target = "idJhiUser")
    @Mapping(source = "jhiUser.login  ", target = "login")
    @Mapping(source = "jhiUser.firstName", target = "prenom")
    @Mapping(source = "jhiUser.lastName", target = "nom")
    @Mapping(source = "jhiUser.email", target = "email")
    @Mapping(source = "jhiUser.activated ", target = "actif")
    @Mapping(source = "entreprise.id", target = "idEntreprise")
    @Mapping(source = "entreprise.nom", target = "nomEntreprise")
    UtilisateurDTO toDto(Utilisateur entity);
}
