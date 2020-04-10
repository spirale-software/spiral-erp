package io.spiral.erp.app.service;

import io.spiral.erp.app.repository.ArticleAppRepository;
import io.spiral.erp.app.service.dto.ArticleDTO;
import io.spiral.erp.app.service.mapper.ArticleMapper;
import io.spiral.erp.jhipster.domain.Article;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

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
        return articleMapper.toDto(articleAppRepository.save(articleMapper.toEntity(articleDTO)));
    }

    public ArticleDTO update(ArticleDTO articleDTO) {
        log.info("Modifier un Article: {}", articleDTO);
        Article article = articleMapper.toEntity(articleDTO);
        article.getAudit().setModifiedAt(ZonedDateTime.now());
        return articleMapper.toDto(articleAppRepository.save(article));
    }

    public void deleteById(Long id) {
        log.info("Supprimer un Article avec pour id: {}", id);
        articleAppRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<ArticleDTO> findAll(String critereTransversal, Pageable pageable) {
        log.info("Rechercher tous les Article correspondant au critère: {}", critereTransversal);
        Specification<Article> specification = articleQueryService.createSpecification(critereTransversal);
        return articleAppRepository.findAll(specification, pageable).map(articleMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Optional<ArticleDTO> findById(Long id) {
        log.info("Rechercher un Article ayant pour id: {}", id);
        return articleAppRepository.findById(id).map(articleMapper::toDto);
    }
}
