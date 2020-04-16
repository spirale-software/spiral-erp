package io.spiral.erp.app.service;

import io.spiral.erp.app.repository.AchatAppRepository;
import io.spiral.erp.app.service.dto.AchatDTO;
import io.spiral.erp.app.service.mapper.AchatMapper;
import io.spiral.erp.jhipster.domain.Achat;
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
public class AchatAppService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final AchatMapper achatMapper;
    private final AchatQueryService achatQueryService;
    private final AchatAppRepository achatAppRepository;

    public AchatAppService(AchatMapper achatMapper, AchatQueryService achatQueryService,
                           AchatAppRepository achatAppRepository) {
        this.achatMapper = achatMapper;
        this.achatQueryService = achatQueryService;
        this.achatAppRepository = achatAppRepository;
    }

    public AchatDTO create(AchatDTO achatDTO) {
        log.info("Créer un nouvel Achat: {}", achatDTO);
        return achatMapper.toDto(achatAppRepository.save(achatMapper.toEntity(achatDTO)));
    }

    public AchatDTO update(AchatDTO achatDTO) {
        log.info("Modifier un Achat: {}", achatDTO);
        Achat achat = achatMapper.toEntity(achatDTO);
        achat.getAudit().setModifiedAt(ZonedDateTime.now());
        return achatMapper.toDto(achatAppRepository.save(achat));
    }

    public void deleteById(Long id) {
        log.info("Supprimer un Achat avec pour id: {}", id);
        achatAppRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<AchatDTO> findAll(String critereTransversal, Pageable pageable) {
        log.info("Rechercher tous les Achat correspondant au critère: {}", critereTransversal);
        Specification<Achat> specification = achatQueryService.createSpecification(critereTransversal);
        Page<Achat> all = achatAppRepository.findAll(specification, pageable);
        return achatAppRepository.findAll(specification, pageable).map(achatMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<AchatDTO> findById(Long id) {
        log.info("Rechercher un Achat ayant pour id: {}", id);
        return achatAppRepository.findById(id).map(achatMapper::toDto);
    }
}
