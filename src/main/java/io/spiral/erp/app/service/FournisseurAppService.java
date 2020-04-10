package io.spiral.erp.app.service;

import io.spiral.erp.app.repository.FournisseurAppRepository;
import io.spiral.erp.app.service.dto.FournisseurDTO;
import io.spiral.erp.app.service.mapper.FournisseurMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FournisseurAppService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final FournisseurMapper fournisseurMapper;
    private final FournisseurQueryService fournisseurQueryService;
    private final FournisseurAppRepository fournisseurAppRepository;

    public FournisseurAppService(FournisseurMapper fournisseurMapper, FournisseurQueryService fournisseurQueryService,
                                 FournisseurAppRepository fournisseurAppRepository) {
        this.fournisseurMapper = fournisseurMapper;
        this.fournisseurQueryService = fournisseurQueryService;
        this.fournisseurAppRepository = fournisseurAppRepository;
    }

    public FournisseurDTO create(FournisseurDTO fournisseurDTO) {
        log.info("Créer un nouvel Fournisseur: {}", fournisseurDTO);
        return null;
    }

    public FournisseurDTO update(FournisseurDTO fournisseurDTO) {
        log.info("Modifier un Fournisseur: {}", fournisseurDTO);
        return null;
    }

    public void deleteById(Long id) {
        log.info("Supprimer un Fournisseur avec pour id: {}", id);
    }

    @Transactional(readOnly = true)
    public List<FournisseurDTO> findAll(String critereTransversal) {
        log.info("Rechercher tous les Fournisseur correspondant au critère: {}", critereTransversal);
        return null;
    }

    @Transactional(readOnly = true)
    public FournisseurDTO findById(Long id) {
        log.info("Rechercher un Fournisseur ayant pour id: {}", id);
        return null;
    }
}
