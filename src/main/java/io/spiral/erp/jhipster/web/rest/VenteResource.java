package io.spiral.erp.jhipster.web.rest;

import io.spiral.erp.jhipster.domain.Vente;
import io.spiral.erp.jhipster.repository.VenteRepository;
import io.spiral.erp.jhipster.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.spiral.erp.jhipster.domain.Vente}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VenteResource {

    private final Logger log = LoggerFactory.getLogger(VenteResource.class);

    private static final String ENTITY_NAME = "vente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VenteRepository venteRepository;

    public VenteResource(VenteRepository venteRepository) {
        this.venteRepository = venteRepository;
    }

    /**
     * {@code POST  /ventes} : Create a new vente.
     *
     * @param vente the vente to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vente, or with status {@code 400 (Bad Request)} if the vente has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ventes")
    public ResponseEntity<Vente> createVente(@RequestBody Vente vente) throws URISyntaxException {
        log.debug("REST request to save Vente : {}", vente);
        if (vente.getId() != null) {
            throw new BadRequestAlertException("A new vente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vente result = venteRepository.save(vente);
        return ResponseEntity.created(new URI("/api/ventes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ventes} : Updates an existing vente.
     *
     * @param vente the vente to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vente,
     * or with status {@code 400 (Bad Request)} if the vente is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vente couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ventes")
    public ResponseEntity<Vente> updateVente(@RequestBody Vente vente) throws URISyntaxException {
        log.debug("REST request to update Vente : {}", vente);
        if (vente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Vente result = venteRepository.save(vente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vente.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ventes} : get all the ventes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ventes in body.
     */
    @GetMapping("/ventes")
    public List<Vente> getAllVentes() {
        log.debug("REST request to get all Ventes");
        return venteRepository.findAll();
    }

    /**
     * {@code GET  /ventes/:id} : get the "id" vente.
     *
     * @param id the id of the vente to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vente, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ventes/{id}")
    public ResponseEntity<Vente> getVente(@PathVariable Long id) {
        log.debug("REST request to get Vente : {}", id);
        Optional<Vente> vente = venteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vente);
    }

    /**
     * {@code DELETE  /ventes/:id} : delete the "id" vente.
     *
     * @param id the id of the vente to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ventes/{id}")
    public ResponseEntity<Void> deleteVente(@PathVariable Long id) {
        log.debug("REST request to delete Vente : {}", id);
        venteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
