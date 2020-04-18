package io.spiral.erp.app.service;

import io.spiral.erp.jhipster.domain.Audit;
import io.spiral.erp.jhipster.repository.AuditRepository;
import io.spiral.erp.jhipster.service.dto.AuditDTO;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
public class AuditAppService {

    private final AuditRepository auditRepository;

    public AuditAppService(AuditRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

    public Audit createAuditFromNow() {
        Audit audit = new Audit();
        audit.setCreatedAt(ZonedDateTime.now());
        audit.setModifiedAt(ZonedDateTime.now());
        return auditRepository.save(audit);
    }
}
