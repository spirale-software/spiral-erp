package io.spiral.erp.app.service.mapper;

import io.spiral.erp.app.service.dto.VenteDTO;
import io.spiral.erp.jhipster.domain.Vente;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface VenteMapper extends EntityMapper<VenteDTO, Vente> {
}
