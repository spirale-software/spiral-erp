package io.spiral.erp.app.service.mapper;

import io.spiral.erp.app.service.dto.DepenseDTO;
import io.spiral.erp.jhipster.domain.Depense;
import io.spiral.erp.jhipster.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface DepenseMapper extends EntityMapper<DepenseDTO, Depense> {

    @Mapping(source = "audit.createdAt", target = "dateDepense")
    DepenseDTO toDto(Depense entity);
}
