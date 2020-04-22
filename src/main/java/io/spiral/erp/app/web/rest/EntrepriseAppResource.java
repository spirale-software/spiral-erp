package io.spiral.erp.app.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.spiral.erp.app.service.EntrepriseAppService;
import io.spiral.erp.app.service.dto.EntrepriseDTO;
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
public class EntrepriseAppResource {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private static final String ENTITY_NAME = "entreprise";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntrepriseAppService entrepriseAppService;

    public EntrepriseAppResource(EntrepriseAppService entrepriseAppService) {
        this.entrepriseAppService = entrepriseAppService;
    }

    @PostMapping("/entreprises")
    public ResponseEntity<EntrepriseDTO> createEntreprise(@Valid @RequestBody EntrepriseDTO entrepriseDTO) throws URISyntaxException {
        log.debug("Requête REST pour créer un Entreprise : {}", entrepriseDTO);
        EntrepriseDTO resultat = entrepriseAppService.create(entrepriseDTO);

        return ResponseEntity.created(new URI("/api/erp/entreprises/" + resultat.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultat.getId().toString()))
            .body(resultat);
    }

    @PutMapping("/entreprises")
    public ResponseEntity<EntrepriseDTO> updateEntreprise(@RequestBody EntrepriseDTO entrepriseDTO) throws URISyntaxException {
        log.debug("Requête REST pour modifier un Entreprise : {}", entrepriseDTO);
        EntrepriseDTO resultat = entrepriseAppService.update(entrepriseDTO);

        return ResponseEntity.created(new URI("/api/erp/entreprises/" + resultat.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultat.getId().toString()))
            .body(resultat);
    }

    @DeleteMapping("/entreprises")
    public ResponseEntity<Void> deleteEntrepriseById(Long id) throws URISyntaxException {
        log.debug("Requête REST pour supprimer un Entreprise : {}", id);
        entrepriseAppService.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(
                applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/entreprises")
    public ResponseEntity<List<EntrepriseDTO>> findAll(Pageable pageable,
                                                       @RequestParam(value = "critereTransversal", required = false) String critereTransverval) {
        log.debug("Requête REST pour recherche les Entreprise avec pour critère de recherche : {}", critereTransverval);
        Page<EntrepriseDTO> page = entrepriseAppService.findAll(critereTransverval, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/entreprises/{id}")
    public ResponseEntity<EntrepriseDTO> findById(@PathVariable Long id) {
        log.debug("Requête REST pour recherche l'Entreprise ayant pour id: {}", id);
        Optional<EntrepriseDTO> entrepriseDTO = entrepriseAppService.findById(id);
        return ResponseUtil.wrapOrNotFound(entrepriseDTO);
    }
}
