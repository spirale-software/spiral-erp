package io.spiral.erp.app.service.mapper;

import io.spiral.erp.app.service.dto.UtilisateurDTO;
import io.spiral.erp.jhipster.domain.Utilisateur;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface UtilisateurMapper extends EntityMapper<UtilisateurDTO, Utilisateur> {

    @Mapping(source = "idJhiUser", target = "jhiUser.id")
    @Mapping(source = "login", target = "jhiUser.login")
    @Mapping(source = "password", target = "jhiUser.password")
    @Mapping(source = "prenom", target = "jhiUser.firstName")
    @Mapping(source = "nom", target = "jhiUser.lastName")
    @Mapping(source = "email", target = "jhiUser.email")
    @Mapping(source = "actif", target = "jhiUser.activated")
    Utilisateur toEntity(UtilisateurDTO dto);
}
