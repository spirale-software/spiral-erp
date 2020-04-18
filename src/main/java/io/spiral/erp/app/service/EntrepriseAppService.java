package io.spiral.erp.app.service;

import io.spiral.erp.app.repository.EntrepriseAppRepository;
import io.spiral.erp.app.service.dto.EntrepriseDTO;
import io.spiral.erp.app.service.mapper.EntrepriseMapper;
import io.spiral.erp.jhipster.domain.Entreprise;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Optional;

@Service
public class EntrepriseAppService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final EntrepriseAppRepository entrepriseAppRepository;
    private final EntrepriseMapper entrepriseMapper;
    private final AuditAppService auditAppService;

    public EntrepriseAppService(EntrepriseAppRepository entrepriseAppRepository, EntrepriseMapper entrepriseMapper,
                                AuditAppService auditAppService) {
        this.entrepriseAppRepository = entrepriseAppRepository;
        this.entrepriseMapper = entrepriseMapper;
        this.auditAppService = auditAppService;
    }

    public EntrepriseDTO create(EntrepriseDTO entrepriseDTO) {
        log.info("Créer un nouvel Entreprise: {}", entrepriseDTO);
        Entreprise entreprise = entrepriseMapper.toEntity(entrepriseDTO);
        entreprise.setAudit(auditAppService.createAuditFromNow());
        return entrepriseMapper.toDto(entrepriseAppRepository.save(entreprise));
    }

    public EntrepriseDTO update(EntrepriseDTO entrepriseDTO) {
        log.info("Modifier un Entreprise: {}", entrepriseDTO);
        Entreprise entreprise = entrepriseMapper.toEntity(entrepriseDTO);
        entreprise.getAudit().setModifiedAt(ZonedDateTime.now());
        return entrepriseMapper.toDto(entrepriseAppRepository.save(entreprise));
    }

    public void deleteById(Long id) {
        log.info("Supprimer un Entreprise avec pour id: {}", id);
        entrepriseAppRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<EntrepriseDTO> findAll(String critereTransversal, Pageable pageable) {
        log.info("Rechercher tous les Entreprise correspondant au critère: {}", critereTransversal);
        // Specification<Entreprise> specification = entrepriseQueryService.createSpecification(critereTransversal);
        return entrepriseAppRepository.findAll(pageable).map(entrepriseMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<EntrepriseDTO> findById(Long id) {
        log.info("Rechercher un Entreprise ayant pour id: {}", id);
        return entrepriseAppRepository.findById(id).map(entrepriseMapper::toDto);
    }
}
