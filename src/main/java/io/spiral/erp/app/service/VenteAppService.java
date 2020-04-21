package io.spiral.erp.app.service;

import io.spiral.erp.app.repository.UtilisateurAppRepository;
import io.spiral.erp.app.repository.VenteAppRepository;
import io.spiral.erp.app.service.dto.VenteDTO;
import io.spiral.erp.app.service.mapper.VenteMapper;
import io.spiral.erp.jhipster.domain.Vente;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Optional;

@Service
@Transactional
public class VenteAppService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final VenteMapper venteMapper;
    private final VenteQueryService venteQueryService;
    private final VenteAppRepository venteAppRepository;
    private final UtilisateurAppRepository utilisateurAppRepository;
    private final AuditAppService auditAppService;


    public VenteAppService(VenteMapper venteMapper, VenteQueryService venteQueryService,
                           VenteAppRepository venteAppRepository, UtilisateurAppRepository utilisateurAppRepository,
                           AuditAppService auditAppService) {
        this.venteMapper = venteMapper;
        this.venteQueryService = venteQueryService;
        this.venteAppRepository = venteAppRepository;
        this.utilisateurAppRepository = utilisateurAppRepository;
        this.auditAppService = auditAppService;
    }

    public VenteDTO create(VenteDTO venteDTO) {
        log.info("Créer un nouvel Vente: {}", venteDTO);
        Vente vente = venteMapper.toEntity(venteDTO);
        vente.setAudit(auditAppService.createAuditFromNow());
        return venteMapper.toDto(venteAppRepository.save(vente));
    }

    public VenteDTO update(VenteDTO venteDTO) {
        log.info("Modifier un Vente: {}", venteDTO);
        Vente vente = venteMapper.toEntity(venteDTO);
        vente.getAudit().setModifiedAt(ZonedDateTime.now());
        return venteMapper.toDto(venteAppRepository.save(vente));
    }

    public void deleteById(Long id) {
        log.info("Supprimer un Vente avec pour id: {}", id);
        venteAppRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<VenteDTO> findAll(String critereTransversal, Pageable pageable) {
        log.info("Rechercher tous les Vente correspondant au critère: {}", critereTransversal);
        Specification<Vente> specification = venteQueryService.createSpecification(critereTransversal);
        Page<Vente> all = venteAppRepository.findAll(specification, pageable);
        return venteAppRepository.findAll(specification, pageable).map(venteMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<VenteDTO> findById(Long id) {
        log.info("Rechercher un Vente ayant pour id: {}", id);
        return venteAppRepository.findById(id).map(venteMapper::toDto);
    }
}
