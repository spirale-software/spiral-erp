package io.spiral.erp.app.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.spiral.erp.app.service.UtilisateurAppService;
import io.spiral.erp.app.service.dto.UtilisateurDTO;
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
public class UtilisateurAppResource {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private static final String ENTITY_NAME = "utilisateur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UtilisateurAppService utilisateurAppService;

    public UtilisateurAppResource(UtilisateurAppService utilisateurAppService) {
        this.utilisateurAppService = utilisateurAppService;
    }

    @PostMapping("/utilisateurs")
    public ResponseEntity<UtilisateurDTO> createUtilisateur(@Valid @RequestBody UtilisateurDTO utilisateurDTO) throws URISyntaxException {
        log.debug("Requête REST pour créer un Utilisateur : {}", utilisateurDTO);
        UtilisateurDTO resultat = utilisateurAppService.create(utilisateurDTO);

        return ResponseEntity.created(new URI("/api/erp/utilisateurs/" + resultat.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultat.getId().toString()))
            .body(resultat);
    }

    @PutMapping("/utilisateurs")
    public ResponseEntity<UtilisateurDTO> updateUtilisateur(@RequestBody UtilisateurDTO utilisateurDTO) throws URISyntaxException {
        log.debug("Requête REST pour modifier un Utilisateur : {}", utilisateurDTO);
        UtilisateurDTO resultat = utilisateurAppService.create(utilisateurDTO);

        return ResponseEntity.created(new URI("/api/erp/utilisateurs/" + resultat.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultat.getId().toString()))
            .body(resultat);
    }

    @DeleteMapping("/utilisateurs")
    public ResponseEntity<Void> deleteUtilisateurById(Long id) throws URISyntaxException {
        log.debug("Requête REST pour supprimer un Utilisateur : {}", id);
        utilisateurAppService.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(
                applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/utilisateurs")
    public ResponseEntity<List<UtilisateurDTO>> findAll(Pageable pageable,
                                                        @RequestParam(value = "critereTransversal", required = false) String critereTransverval) {
        log.debug("Requête REST pour recherche les Utilisateur avec pour critère de recherche : {}", critereTransverval);
        Page<UtilisateurDTO> page = utilisateurAppService.findAll(critereTransverval, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/utilisateurs/{id}")
    public ResponseEntity<UtilisateurDTO> findById(@PathVariable Long id) {
        log.debug("Requête REST pour recherche l'Utilisateur ayant pour id: {}", id);
        Optional<UtilisateurDTO> utilisateurDTO = utilisateurAppService.findById(id);
        return ResponseUtil.wrapOrNotFound(utilisateurDTO);
    }
}
