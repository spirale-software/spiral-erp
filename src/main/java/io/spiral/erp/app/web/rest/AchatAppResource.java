package io.spiral.erp.app.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.spiral.erp.app.service.AchatAppService;
import io.spiral.erp.app.service.dto.AchatDTO;
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
public class AchatAppResource {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private static final String ENTITY_NAME = "article";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AchatAppService achatAppService;

    public AchatAppResource(AchatAppService achatAppService) {
        this.achatAppService = achatAppService;
    }

    @PostMapping("/achats")
    public ResponseEntity<AchatDTO> createAchat(AchatDTO achatDTO) throws URISyntaxException {
        log.debug("Requête REST pour créer un Achat : {}", achatDTO);
        AchatDTO resultat = achatAppService.create(achatDTO);

        return ResponseEntity.created(new URI("/api/erp/achats/" + resultat.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultat.getId().toString()))
            .body(resultat);
    }

    @PutMapping("/achats")
    public ResponseEntity<AchatDTO> updateAchat(AchatDTO achatDTO) throws URISyntaxException {
        log.debug("Requête REST pour modifier un Achat : {}", achatDTO);
        AchatDTO resultat = achatAppService.create(achatDTO);

        return ResponseEntity.created(new URI("/api/erp/achats/" + resultat.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultat.getId().toString()))
            .body(resultat);
    }

    @DeleteMapping("/achats")
    public ResponseEntity<Void> deleteAchatById(Long id) throws URISyntaxException {
        log.debug("Requête REST pour supprimer un Achat : {}", id);
        achatAppService.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(
                applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/achats")
    public ResponseEntity<List<AchatDTO>> findAll(String critereTransverval) {
        log.debug("Requête REST pour recherche les Achat avec pour critère de recherche : {}", critereTransverval);
        return null;
    }

    @GetMapping("/achats/{id}")
    public ResponseEntity<AchatDTO> findById(@PathVariable Long id) {
        log.debug("Requête REST pour recherche l'Achat ayant pour id: {}", id);
        return null;
    }
}