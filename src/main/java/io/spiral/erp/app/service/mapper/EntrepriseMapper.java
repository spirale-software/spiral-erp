package io.spiral.erp.app.service.mapper;

import io.spiral.erp.app.service.dto.EntrepriseDTO;
import io.spiral.erp.jhipster.domain.Entreprise;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface EntrepriseMapper extends EntityMapper<EntrepriseDTO, Entreprise> {
}
