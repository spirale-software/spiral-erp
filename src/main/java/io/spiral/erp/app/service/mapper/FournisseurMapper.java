package io.spiral.erp.app.service.mapper;

import io.spiral.erp.app.service.dto.FournisseurDTO;
import io.spiral.erp.jhipster.domain.Fournisseur;
import io.spiral.erp.jhipster.service.mapper.AuditMapper;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {AuditMapper.class})
public interface FournisseurMapper extends EntityMapper<FournisseurDTO, Fournisseur> {
}
