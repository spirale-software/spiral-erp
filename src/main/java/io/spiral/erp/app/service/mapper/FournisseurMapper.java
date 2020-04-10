package io.spiral.erp.app.service.mapper;

import io.spiral.erp.app.service.dto.FournisseurDTO;
import io.spiral.erp.jhipster.domain.Fournisseur;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface FournisseurMapper extends EntityMapper<FournisseurDTO, Fournisseur> {
}
