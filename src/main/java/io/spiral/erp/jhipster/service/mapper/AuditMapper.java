package io.spiral.erp.jhipster.service.mapper;

import io.spiral.erp.jhipster.domain.*;
import io.spiral.erp.jhipster.service.dto.AuditDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Audit} and its DTO {@link AuditDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AuditMapper extends EntityMapper<AuditDTO, Audit> {



    default Audit fromId(Long id) {
        if (id == null) {
            return null;
        }
        Audit audit = new Audit();
        audit.setId(id);
        return audit;
    }
}
