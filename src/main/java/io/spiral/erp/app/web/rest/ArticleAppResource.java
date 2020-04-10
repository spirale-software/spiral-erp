package io.spiral.erp.app.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.spiral.erp.app.service.ArticleAppService;
import io.spiral.erp.app.service.dto.ArticleDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/erp")
public class ArticleAppResource {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private static final String ENTITY_NAME = "article";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArticleAppService articleAppService;

    public ArticleAppResource(ArticleAppService articleAppService) {
        this.articleAppService = articleAppService;
    }

    @PostMapping("/articles")
    public ResponseEntity<ArticleDTO> createArticle(ArticleDTO articleDTO) throws URISyntaxException {
        log.debug("Requête REST pour créer un Article : {}", articleDTO);
        ArticleDTO resultat = articleAppService.create(articleDTO);

        return ResponseEntity.created(new URI("/api/erp/articles/" + resultat.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultat.getId().toString()))
            .body(resultat);
    }

    @PutMapping("/articles")
    public ResponseEntity<ArticleDTO> updateArticle(ArticleDTO articleDTO) throws URISyntaxException {
        log.debug("Requête REST pour modifier un Article : {}", articleDTO);
        ArticleDTO resultat = articleAppService.create(articleDTO);

        return ResponseEntity.created(new URI("/api/erp/articles/" + resultat.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultat.getId().toString()))
            .body(resultat);
    }

    @DeleteMapping("/articles")
    public ResponseEntity<Void> deleteArticleById(Long id) throws URISyntaxException {
        log.debug("Requête REST pour supprimer un Article : {}", id);
        articleAppService.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(
                applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/articles")
    public ResponseEntity<List<ArticleDTO>> findAll(String critereTransverval) {
        log.debug("Requête REST pour recherche les Article avec pour critère de recherche : {}", critereTransverval);
        return null;
    }

    @GetMapping("/articles/{id}")
    public ResponseEntity<ArticleDTO> findById(@PathVariable Long id) {
        log.debug("Requête REST pour recherche l'Article ayant pour id: {}", id);
        return null;
    }
}
