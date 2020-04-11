package io.spiral.erp.app.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.spiral.erp.app.service.ArticleAppService;
import io.spiral.erp.app.service.dto.ArticleDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<ArticleDTO> createArticle(@Valid @RequestBody ArticleDTO articleDTO) throws URISyntaxException {
        log.debug("Requête REST pour créer un Article : {}", articleDTO);
        ArticleDTO resultat = articleAppService.create(articleDTO);

        return ResponseEntity.created(new URI("/api/erp/articles/" + resultat.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultat.getId().toString()))
            .body(resultat);
    }

    @PutMapping("/articles")
    public ResponseEntity<ArticleDTO> updateArticle(@RequestBody ArticleDTO articleDTO) throws URISyntaxException {
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
    public ResponseEntity<List<ArticleDTO>> findAll(Pageable pageable,
                                                    @RequestParam(value = "critereTransversal", required = false) String critereTransverval) {
        log.debug("Requête REST pour recherche les Article avec pour critère de recherche : {}", critereTransverval);
        Page<ArticleDTO> page = articleAppService.findAll(critereTransverval, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/articles/{id}")
    public ResponseEntity<ArticleDTO> findById(@PathVariable Long id) {
        log.debug("Requête REST pour recherche l'Article ayant pour id: {}", id);
        Optional<ArticleDTO> articleDTO = articleAppService.findById(id);
        return ResponseUtil.wrapOrNotFound(articleDTO);
    }
}
