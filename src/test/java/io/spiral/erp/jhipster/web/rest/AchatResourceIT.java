package io.spiral.erp.jhipster.web.rest;

import io.spiral.erp.jhipster.SpiralErpApp;
import io.spiral.erp.jhipster.domain.Achat;
import io.spiral.erp.jhipster.repository.AchatRepository;
import io.spiral.erp.jhipster.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static io.spiral.erp.jhipster.web.rest.TestUtil.sameInstant;
import static io.spiral.erp.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AchatResource} REST controller.
 */
@SpringBootTest(classes = SpiralErpApp.class)
public class AchatResourceIT {

    private static final ZonedDateTime DEFAULT_DATE_ACHAT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_ACHAT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Double DEFAULT_PRIX_UNITAIRE = 1D;
    private static final Double UPDATED_PRIX_UNITAIRE = 2D;

    private static final Integer DEFAULT_QUANTITE = 1;
    private static final Integer UPDATED_QUANTITE = 2;

    @Autowired
    private AchatRepository achatRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAchatMockMvc;

    private Achat achat;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AchatResource achatResource = new AchatResource(achatRepository);
        this.restAchatMockMvc = MockMvcBuilders.standaloneSetup(achatResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Achat createEntity(EntityManager em) {
        Achat achat = new Achat()
            .dateAchat(DEFAULT_DATE_ACHAT)
            .prixUnitaire(DEFAULT_PRIX_UNITAIRE)
            .quantite(DEFAULT_QUANTITE);
        return achat;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Achat createUpdatedEntity(EntityManager em) {
        Achat achat = new Achat()
            .dateAchat(UPDATED_DATE_ACHAT)
            .prixUnitaire(UPDATED_PRIX_UNITAIRE)
            .quantite(UPDATED_QUANTITE);
        return achat;
    }

    @BeforeEach
    public void initTest() {
        achat = createEntity(em);
    }

    @Test
    @Transactional
    public void createAchat() throws Exception {
        int databaseSizeBeforeCreate = achatRepository.findAll().size();

        // Create the Achat
        restAchatMockMvc.perform(post("/api/achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(achat)))
            .andExpect(status().isCreated());

        // Validate the Achat in the database
        List<Achat> achatList = achatRepository.findAll();
        assertThat(achatList).hasSize(databaseSizeBeforeCreate + 1);
        Achat testAchat = achatList.get(achatList.size() - 1);
        assertThat(testAchat.getDateAchat()).isEqualTo(DEFAULT_DATE_ACHAT);
        assertThat(testAchat.getPrixUnitaire()).isEqualTo(DEFAULT_PRIX_UNITAIRE);
        assertThat(testAchat.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
    }

    @Test
    @Transactional
    public void createAchatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = achatRepository.findAll().size();

        // Create the Achat with an existing ID
        achat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAchatMockMvc.perform(post("/api/achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(achat)))
            .andExpect(status().isBadRequest());

        // Validate the Achat in the database
        List<Achat> achatList = achatRepository.findAll();
        assertThat(achatList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAchats() throws Exception {
        // Initialize the database
        achatRepository.saveAndFlush(achat);

        // Get all the achatList
        restAchatMockMvc.perform(get("/api/achats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(achat.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateAchat").value(hasItem(sameInstant(DEFAULT_DATE_ACHAT))))
            .andExpect(jsonPath("$.[*].prixUnitaire").value(hasItem(DEFAULT_PRIX_UNITAIRE.doubleValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)));
    }
    
    @Test
    @Transactional
    public void getAchat() throws Exception {
        // Initialize the database
        achatRepository.saveAndFlush(achat);

        // Get the achat
        restAchatMockMvc.perform(get("/api/achats/{id}", achat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(achat.getId().intValue()))
            .andExpect(jsonPath("$.dateAchat").value(sameInstant(DEFAULT_DATE_ACHAT)))
            .andExpect(jsonPath("$.prixUnitaire").value(DEFAULT_PRIX_UNITAIRE.doubleValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE));
    }

    @Test
    @Transactional
    public void getNonExistingAchat() throws Exception {
        // Get the achat
        restAchatMockMvc.perform(get("/api/achats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAchat() throws Exception {
        // Initialize the database
        achatRepository.saveAndFlush(achat);

        int databaseSizeBeforeUpdate = achatRepository.findAll().size();

        // Update the achat
        Achat updatedAchat = achatRepository.findById(achat.getId()).get();
        // Disconnect from session so that the updates on updatedAchat are not directly saved in db
        em.detach(updatedAchat);
        updatedAchat
            .dateAchat(UPDATED_DATE_ACHAT)
            .prixUnitaire(UPDATED_PRIX_UNITAIRE)
            .quantite(UPDATED_QUANTITE);

        restAchatMockMvc.perform(put("/api/achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAchat)))
            .andExpect(status().isOk());

        // Validate the Achat in the database
        List<Achat> achatList = achatRepository.findAll();
        assertThat(achatList).hasSize(databaseSizeBeforeUpdate);
        Achat testAchat = achatList.get(achatList.size() - 1);
        assertThat(testAchat.getDateAchat()).isEqualTo(UPDATED_DATE_ACHAT);
        assertThat(testAchat.getPrixUnitaire()).isEqualTo(UPDATED_PRIX_UNITAIRE);
        assertThat(testAchat.getQuantite()).isEqualTo(UPDATED_QUANTITE);
    }

    @Test
    @Transactional
    public void updateNonExistingAchat() throws Exception {
        int databaseSizeBeforeUpdate = achatRepository.findAll().size();

        // Create the Achat

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAchatMockMvc.perform(put("/api/achats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(achat)))
            .andExpect(status().isBadRequest());

        // Validate the Achat in the database
        List<Achat> achatList = achatRepository.findAll();
        assertThat(achatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAchat() throws Exception {
        // Initialize the database
        achatRepository.saveAndFlush(achat);

        int databaseSizeBeforeDelete = achatRepository.findAll().size();

        // Delete the achat
        restAchatMockMvc.perform(delete("/api/achats/{id}", achat.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Achat> achatList = achatRepository.findAll();
        assertThat(achatList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
