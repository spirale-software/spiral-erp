package io.spiral.erp.app.service.mapper;

import io.spiral.erp.app.service.dto.UtilisateurDTO;
import io.spiral.erp.jhipster.domain.Utilisateur;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface UtilisateurMapper extends EntityMapper<UtilisateurDTO, Utilisateur> {
}
