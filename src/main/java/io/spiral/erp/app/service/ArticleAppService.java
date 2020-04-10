package io.spiral.erp.app.service;

import io.spiral.erp.app.repository.ArticleAppRepository;
import io.spiral.erp.app.service.dto.ArticleDTO;
import io.spiral.erp.app.service.mapper.ArticleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ArticleAppService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private final ArticleMapper articleMapper;
    private final ArticleQueryService articleQueryService;
    private final ArticleAppRepository articleAppRepository;

    public ArticleAppService(ArticleMapper articleMapper, ArticleQueryService articleQueryService,
                             ArticleAppRepository articleAppRepository) {
        this.articleMapper = articleMapper;
        this.articleQueryService = articleQueryService;
        this.articleAppRepository = articleAppRepository;
    }

    public ArticleDTO create(ArticleDTO articleDTO) {
        log.info("Créer un nouvel Article: {}", articleDTO);
        return null;
    }

    public ArticleDTO update(ArticleDTO articleDTO) {
        log.info("Modifier un Article: {}", articleDTO);
        return null;
    }

    public void deleteById(Long id) {
        log.info("Supprimer un Article avec pour id: {}", id);
    }

    @Transactional(readOnly = true)
    public List<ArticleDTO> findAll(String critereTransversal) {
        log.info("Rechercher tous les Article correspondant au critère: {}", critereTransversal);
        return null;
    }

    @Transactional(readOnly = true)
    public ArticleDTO findById(Long id) {
        log.info("Rechercher un Article ayant pour id: {}", id);
        return null;
    }
}
