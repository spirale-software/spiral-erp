package io.spiral.erp.app.service;

import io.spiral.erp.app.repository.DepenseAppRepository;
import io.spiral.erp.app.repository.UtilisateurAppRepository;
import io.spiral.erp.app.service.dto.DepenseDTO;
import io.spiral.erp.app.service.mapper.DepenseMapper;
import io.spiral.erp.jhipster.domain.Depense;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Optional;

@Service
@Transactional
public class DepenseAppService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final DepenseMapper depenseMapper;
    private final DepenseQueryService depenseQueryService;
    private final DepenseAppRepository depenseAppRepository;
    private final UtilisateurAppRepository utilisateurAppRepository;
    private final AuditAppService auditAppService;


    public DepenseAppService(DepenseMapper depenseMapper, DepenseQueryService depenseQueryService,
                           DepenseAppRepository depenseAppRepository, UtilisateurAppRepository utilisateurAppRepository,
                           AuditAppService auditAppService) {
        this.depenseMapper = depenseMapper;
        this.depenseQueryService = depenseQueryService;
        this.depenseAppRepository = depenseAppRepository;
        this.utilisateurAppRepository = utilisateurAppRepository;
        this.auditAppService = auditAppService;
    }

    public DepenseDTO create(DepenseDTO depenseDTO) {
        log.info("Créer un nouvel Depense: {}", depenseDTO);
        Depense depense = depenseMapper.toEntity(depenseDTO);
        depense.setAudit(auditAppService.createAuditFromNow());
        return depenseMapper.toDto(depenseAppRepository.save(depense));
    }

    public DepenseDTO update(DepenseDTO depenseDTO) {
        log.info("Modifier un Depense: {}", depenseDTO);
        Depense depense = depenseMapper.toEntity(depenseDTO);
        depense.getAudit().setModifiedAt(ZonedDateTime.now());
        return depenseMapper.toDto(depenseAppRepository.save(depense));
    }

    public void deleteById(Long id) {
        log.info("Supprimer un Depense avec pour id: {}", id);
        depenseAppRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<DepenseDTO> findAll(String critereTransversal, Pageable pageable) {
        log.info("Rechercher tous les Depense correspondant au critère: {}", critereTransversal);
        Specification<Depense> specification = depenseQueryService.createSpecification(critereTransversal);
        Page<Depense> all = depenseAppRepository.findAll(specification, pageable);
        return depenseAppRepository.findAll(specification, pageable).map(depenseMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<DepenseDTO> findById(Long id) {
        log.info("Rechercher un Depense ayant pour id: {}", id);
        return depenseAppRepository.findById(id).map(depenseMapper::toDto);
    }
}
