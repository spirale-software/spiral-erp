package io.spiral.erp.app.service.utils;

import io.spiral.erp.jhipster.service.dto.AuditDTO;

import java.time.ZonedDateTime;

public class AuditBuilder {

    public static AuditDTO buildAuditFromNow() {
        AuditDTO auditDTO = new AuditDTO();
        auditDTO.setCreatedAt(ZonedDateTime.now());
        auditDTO.setModifiedAt(ZonedDateTime.now());
        return auditDTO;
    }
}
