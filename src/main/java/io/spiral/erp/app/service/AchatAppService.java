package io.spiral.erp.app.service;

import io.spiral.erp.app.repository.AchatAppRepository;
import io.spiral.erp.app.service.dto.AchatDTO;
import io.spiral.erp.app.service.mapper.AchatMapper;
import io.spiral.erp.jhipster.domain.Achat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
        return null;
    }

    public AchatDTO update(AchatDTO achatDTO) {
        return null;
    }

    public void deleteById(Long id) {
    }

    @Transactional(readOnly = true)
    public List<AchatDTO> findAll(String critereTransversal) {
        log.info("Rechercher tous les Achats correspondant au critère: {}", critereTransversal);
        return null;
    }

    @Transactional(readOnly = true)
    public AchatDTO findById(Long id) {
        log.info("Rechercher un Achat ayant pour id: {}", id);
        return null;
    }
}
