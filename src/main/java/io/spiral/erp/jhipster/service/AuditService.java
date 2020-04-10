package io.spiral.erp.jhipster.service;

import io.spiral.erp.jhipster.domain.Audit;
import io.spiral.erp.jhipster.repository.AuditRepository;
import io.spiral.erp.jhipster.service.dto.AuditDTO;
import io.spiral.erp.jhipster.service.mapper.AuditMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Audit}.
 */
@Service
@Transactional
public class AuditService {

    private final Logger log = LoggerFactory.getLogger(AuditService.class);

    private final AuditRepository auditRepository;

    private final AuditMapper auditMapper;

    public AuditService(AuditRepository auditRepository, AuditMapper auditMapper) {
        this.auditRepository = auditRepository;
        this.auditMapper = auditMapper;
    }

    /**
     * Save a audit.
     *
     * @param auditDTO the entity to save.
     * @return the persisted entity.
     */
    public AuditDTO save(AuditDTO auditDTO) {
        log.debug("Request to save Audit : {}", auditDTO);
        Audit audit = auditMapper.toEntity(auditDTO);
        audit = auditRepository.save(audit);
        return auditMapper.toDto(audit);
    }

    /**
     * Get all the audits.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<AuditDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Audits");
        return auditRepository.findAll(pageable)
            .map(auditMapper::toDto);
    }


    /**
     * Get one audit by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AuditDTO> findOne(Long id) {
        log.debug("Request to get Audit : {}", id);
        return auditRepository.findById(id)
            .map(auditMapper::toDto);
    }

    /**
     * Delete the audit by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Audit : {}", id);
        auditRepository.deleteById(id);
    }
}
