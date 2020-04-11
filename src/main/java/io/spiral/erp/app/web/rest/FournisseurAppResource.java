package io.spiral.erp.app.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.spiral.erp.app.service.FournisseurAppService;
import io.spiral.erp.app.service.dto.FournisseurDTO;
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
public class FournisseurAppResource {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private static final String ENTITY_NAME = "fournisseur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FournisseurAppService fournisseurAppService;

    public FournisseurAppResource(FournisseurAppService fournisseurAppService) {
        this.fournisseurAppService = fournisseurAppService;
    }

    @PostMapping("/fournisseurs")
    public ResponseEntity<FournisseurDTO> createFournisseur(FournisseurDTO fournisseurDTO) throws URISyntaxException {
        log.debug("Requête REST pour créer un Fournisseur : {}", fournisseurDTO);
        FournisseurDTO resultat = fournisseurAppService.create(fournisseurDTO);

        return ResponseEntity.created(new URI("/api/erp/fournisseurs/" + resultat.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultat.getId().toString()))
            .body(resultat);
    }

    @PutMapping("/fournisseurs")
    public ResponseEntity<FournisseurDTO> updateFournisseur(FournisseurDTO fournisseurDTO) throws URISyntaxException {
        log.debug("Requête REST pour modifier un Fournisseur : {}", fournisseurDTO);
        FournisseurDTO resultat = fournisseurAppService.create(fournisseurDTO);

        return ResponseEntity.created(new URI("/api/erp/fournisseurs/" + resultat.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultat.getId().toString()))
            .body(resultat);
    }

    @DeleteMapping("/fournisseurs")
    public ResponseEntity<Void> deleteFournisseurById(Long id) throws URISyntaxException {
        log.debug("Requête REST pour supprimer un Fournisseur : {}", id);
        fournisseurAppService.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(
                applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/fournisseurs")
    public ResponseEntity<List<FournisseurDTO>> findAll(String critereTransverval) {
        log.debug("Requête REST pour recherche les Fournisseur avec pour critère de recherche : {}", critereTransverval);
        return null;
    }

    @GetMapping("/fournisseurs/{id}")
    public ResponseEntity<FournisseurDTO> findById(@PathVariable Long id) {
        log.debug("Requête REST pour recherche Fournisseur ayant pour id: {}", id);
        return null;
    }
}
