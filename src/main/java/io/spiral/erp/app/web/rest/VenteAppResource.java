package io.spiral.erp.app.web.rest;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.spiral.erp.app.service.VenteAppService;
import io.spiral.erp.app.service.dto.VenteDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/erp")
public class VenteAppResource {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private static final String ENTITY_NAME = "vente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VenteAppService venteAppService;

    public VenteAppResource(VenteAppService venteAppService) {
        this.venteAppService = venteAppService;
    }

    @PostMapping("/ventes")
    public ResponseEntity<VenteDTO> createVente(@RequestBody VenteDTO venteDTO) throws URISyntaxException {
        log.debug("Requête REST pour créer une Vente : {}", venteDTO);
        VenteDTO resultat = venteAppService.create(venteDTO);

        return ResponseEntity.created(new URI("/api/erp/ventes/" + resultat.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultat.getId().toString()))
            .body(resultat);
    }

    @PutMapping("/ventes")
    public ResponseEntity<VenteDTO> updateVente(@RequestBody VenteDTO venteDTO) throws URISyntaxException {
        log.debug("Requête REST pour modifier une Vente : {}", venteDTO);
        VenteDTO resultat = venteAppService.update(venteDTO);

        return ResponseEntity.created(new URI("/api/erp/ventes/" + resultat.getId()))

            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultat.getId().toString()))
            .body(resultat);
    }

    @DeleteMapping("/ventes")
    public ResponseEntity<Void> deleteVenteById(Long id) throws URISyntaxException {
        log.debug("Requête REST pour supprimer une Vente : {}", id);
        venteAppService.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(
                applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/ventes")
    public ResponseEntity<List<VenteDTO>> findAll(String critereTransverval, Pageable pageable) {
        log.debug("Requête REST pour recherche les Vente avec pour critère de recherche : {}", critereTransverval);
        Page<VenteDTO> page = venteAppService.findAll(critereTransverval, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/ventes/{id}")
    public ResponseEntity<VenteDTO> findById(@PathVariable Long id) {
        log.debug("Requête REST pour recherche une Vente ayant pour id: {}", id);
        Optional<VenteDTO> articleDTO = venteAppService.findById(id);
        return ResponseUtil.wrapOrNotFound(articleDTO);
    }
}
