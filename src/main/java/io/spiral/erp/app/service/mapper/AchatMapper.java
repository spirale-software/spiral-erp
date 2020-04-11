package io.spiral.erp.app.service.mapper;

import io.spiral.erp.app.service.dto.AchatDTO;
import io.spiral.erp.jhipster.domain.Achat;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface AchatMapper extends EntityMapper<AchatDTO, Achat> {
}
