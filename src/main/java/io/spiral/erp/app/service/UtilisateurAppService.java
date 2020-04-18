package io.spiral.erp.app.service;

import io.spiral.erp.app.repository.UtilisateurAppRepository;
import io.spiral.erp.app.service.dto.UtilisateurDTO;
import io.spiral.erp.app.service.mapper.UtilisateurMapper;
import io.spiral.erp.jhipster.domain.Utilisateur;
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
public class UtilisateurAppService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final UtilisateurMapper utilisateurMapper;
    private final UtilisateurQueryService utilisateurQueryService;
    private final UtilisateurAppRepository utilisateurAppRepository;

    public UtilisateurAppService(UtilisateurMapper utilisateurMapper, UtilisateurQueryService utilisateurQueryService,
                             UtilisateurAppRepository utilisateurAppRepository) {
        this.utilisateurMapper = utilisateurMapper;
        this.utilisateurQueryService = utilisateurQueryService;
        this.utilisateurAppRepository = utilisateurAppRepository;
    }

    public UtilisateurDTO create(UtilisateurDTO utilisateurDTO) {
        log.info("Créer un nouvel Utilisateur: {}", utilisateurDTO);
        return utilisateurMapper.toDto(utilisateurAppRepository.save(utilisateurMapper.toEntity(utilisateurDTO)));
    }

    public UtilisateurDTO update(UtilisateurDTO utilisateurDTO) {
        log.info("Modifier un Utilisateur: {}", utilisateurDTO);
        Utilisateur utilisateur = utilisateurMapper.toEntity(utilisateurDTO);
        utilisateur.getAudit().setModifiedAt(ZonedDateTime.now());
        return utilisateurMapper.toDto(utilisateurAppRepository.save(utilisateur));
    }

    public void deleteById(Long id) {
        log.info("Supprimer un Utilisateur avec pour id: {}", id);
        utilisateurAppRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<UtilisateurDTO> findAll(String critereTransversal, Pageable pageable) {
        log.info("Rechercher tous les Utilisateur correspondant au critère: {}", critereTransversal);
        Specification<Utilisateur> specification = utilisateurQueryService.createSpecification(critereTransversal);
        return utilisateurAppRepository.findAll(specification, pageable).map(utilisateurMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<UtilisateurDTO> findById(Long id) {
        log.info("Rechercher un Utilisateur ayant pour id: {}", id);
        return utilisateurAppRepository.findById(id).map(utilisateurMapper::toDto);
    }
}
