package io.spiral.erp.app.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/erp")
public class FournisseurAppResource {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private static final String ENTITY_NAME = "fournisseur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;
}
