package io.spiral.erp.app.service;

import io.spiral.erp.jhipster.service.dto.ArticleDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ArticleAppService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    public ArticleDTO create(ArticleDTO articleDTO) {
        log.info("Création d'un nouvel article: {}", articleDTO);
        return null;
    }

    public ArticleDTO update(ArticleDTO articleDTO) {
        log.info("Modification d'un article: {}", articleDTO);
        return null;
    }

    public void deleteById(Long id) {
        log.info("Suppression d'un article avec pour id: {}", id);
    }
}
