package io.spiral.erp.jhipster.web.rest;

import io.spiral.erp.jhipster.SpiralErpApp;
import io.spiral.erp.jhipster.domain.Audit;
import io.spiral.erp.jhipster.repository.AuditRepository;
import io.spiral.erp.jhipster.service.AuditService;
import io.spiral.erp.jhipster.service.dto.AuditDTO;
import io.spiral.erp.jhipster.service.mapper.AuditMapper;
import io.spiral.erp.jhipster.web.rest.errors.ExceptionTranslator;
import io.spiral.erp.jhipster.service.dto.AuditCriteria;
import io.spiral.erp.jhipster.service.AuditQueryService;

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
 * Integration tests for the {@link AuditResource} REST controller.
 */
@SpringBootTest(classes = SpiralErpApp.class)
public class AuditResourceIT {

    private static final ZonedDateTime DEFAULT_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final ZonedDateTime DEFAULT_MODIFIED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_MODIFIED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    @Autowired
    private AuditRepository auditRepository;

    @Autowired
    private AuditMapper auditMapper;

    @Autowired
    private AuditService auditService;

    @Autowired
    private AuditQueryService auditQueryService;

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

    private MockMvc restAuditMockMvc;

    private Audit audit;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AuditResource auditResource = new AuditResource(auditService, auditQueryService);
        this.restAuditMockMvc = MockMvcBuilders.standaloneSetup(auditResource)
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
    public static Audit createEntity(EntityManager em) {
        Audit audit = new Audit()
            .createdAt(DEFAULT_CREATED_AT)
            .modifiedAt(DEFAULT_MODIFIED_AT);
        return audit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Audit createUpdatedEntity(EntityManager em) {
        Audit audit = new Audit()
            .createdAt(UPDATED_CREATED_AT)
            .modifiedAt(UPDATED_MODIFIED_AT);
        return audit;
    }

    @BeforeEach
    public void initTest() {
        audit = createEntity(em);
    }

    @Test
    @Transactional
    public void createAudit() throws Exception {
        int databaseSizeBeforeCreate = auditRepository.findAll().size();

        // Create the Audit
        AuditDTO auditDTO = auditMapper.toDto(audit);
        restAuditMockMvc.perform(post("/api/audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditDTO)))
            .andExpect(status().isCreated());

        // Validate the Audit in the database
        List<Audit> auditList = auditRepository.findAll();
        assertThat(auditList).hasSize(databaseSizeBeforeCreate + 1);
        Audit testAudit = auditList.get(auditList.size() - 1);
        assertThat(testAudit.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testAudit.getModifiedAt()).isEqualTo(DEFAULT_MODIFIED_AT);
    }

    @Test
    @Transactional
    public void createAuditWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = auditRepository.findAll().size();

        // Create the Audit with an existing ID
        audit.setId(1L);
        AuditDTO auditDTO = auditMapper.toDto(audit);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuditMockMvc.perform(post("/api/audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Audit in the database
        List<Audit> auditList = auditRepository.findAll();
        assertThat(auditList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAudits() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList
        restAuditMockMvc.perform(get("/api/audits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(audit.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(sameInstant(DEFAULT_CREATED_AT))))
            .andExpect(jsonPath("$.[*].modifiedAt").value(hasItem(sameInstant(DEFAULT_MODIFIED_AT))));
    }
    
    @Test
    @Transactional
    public void getAudit() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get the audit
        restAuditMockMvc.perform(get("/api/audits/{id}", audit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(audit.getId().intValue()))
            .andExpect(jsonPath("$.createdAt").value(sameInstant(DEFAULT_CREATED_AT)))
            .andExpect(jsonPath("$.modifiedAt").value(sameInstant(DEFAULT_MODIFIED_AT)));
    }


    @Test
    @Transactional
    public void getAuditsByIdFiltering() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        Long id = audit.getId();

        defaultAuditShouldBeFound("id.equals=" + id);
        defaultAuditShouldNotBeFound("id.notEquals=" + id);

        defaultAuditShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultAuditShouldNotBeFound("id.greaterThan=" + id);

        defaultAuditShouldBeFound("id.lessThanOrEqual=" + id);
        defaultAuditShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllAuditsByCreatedAtIsEqualToSomething() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where createdAt equals to DEFAULT_CREATED_AT
        defaultAuditShouldBeFound("createdAt.equals=" + DEFAULT_CREATED_AT);

        // Get all the auditList where createdAt equals to UPDATED_CREATED_AT
        defaultAuditShouldNotBeFound("createdAt.equals=" + UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    public void getAllAuditsByCreatedAtIsNotEqualToSomething() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where createdAt not equals to DEFAULT_CREATED_AT
        defaultAuditShouldNotBeFound("createdAt.notEquals=" + DEFAULT_CREATED_AT);

        // Get all the auditList where createdAt not equals to UPDATED_CREATED_AT
        defaultAuditShouldBeFound("createdAt.notEquals=" + UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    public void getAllAuditsByCreatedAtIsInShouldWork() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where createdAt in DEFAULT_CREATED_AT or UPDATED_CREATED_AT
        defaultAuditShouldBeFound("createdAt.in=" + DEFAULT_CREATED_AT + "," + UPDATED_CREATED_AT);

        // Get all the auditList where createdAt equals to UPDATED_CREATED_AT
        defaultAuditShouldNotBeFound("createdAt.in=" + UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    public void getAllAuditsByCreatedAtIsNullOrNotNull() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where createdAt is not null
        defaultAuditShouldBeFound("createdAt.specified=true");

        // Get all the auditList where createdAt is null
        defaultAuditShouldNotBeFound("createdAt.specified=false");
    }

    @Test
    @Transactional
    public void getAllAuditsByCreatedAtIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where createdAt is greater than or equal to DEFAULT_CREATED_AT
        defaultAuditShouldBeFound("createdAt.greaterThanOrEqual=" + DEFAULT_CREATED_AT);

        // Get all the auditList where createdAt is greater than or equal to UPDATED_CREATED_AT
        defaultAuditShouldNotBeFound("createdAt.greaterThanOrEqual=" + UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    public void getAllAuditsByCreatedAtIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where createdAt is less than or equal to DEFAULT_CREATED_AT
        defaultAuditShouldBeFound("createdAt.lessThanOrEqual=" + DEFAULT_CREATED_AT);

        // Get all the auditList where createdAt is less than or equal to SMALLER_CREATED_AT
        defaultAuditShouldNotBeFound("createdAt.lessThanOrEqual=" + SMALLER_CREATED_AT);
    }

    @Test
    @Transactional
    public void getAllAuditsByCreatedAtIsLessThanSomething() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where createdAt is less than DEFAULT_CREATED_AT
        defaultAuditShouldNotBeFound("createdAt.lessThan=" + DEFAULT_CREATED_AT);

        // Get all the auditList where createdAt is less than UPDATED_CREATED_AT
        defaultAuditShouldBeFound("createdAt.lessThan=" + UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    public void getAllAuditsByCreatedAtIsGreaterThanSomething() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where createdAt is greater than DEFAULT_CREATED_AT
        defaultAuditShouldNotBeFound("createdAt.greaterThan=" + DEFAULT_CREATED_AT);

        // Get all the auditList where createdAt is greater than SMALLER_CREATED_AT
        defaultAuditShouldBeFound("createdAt.greaterThan=" + SMALLER_CREATED_AT);
    }


    @Test
    @Transactional
    public void getAllAuditsByModifiedAtIsEqualToSomething() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where modifiedAt equals to DEFAULT_MODIFIED_AT
        defaultAuditShouldBeFound("modifiedAt.equals=" + DEFAULT_MODIFIED_AT);

        // Get all the auditList where modifiedAt equals to UPDATED_MODIFIED_AT
        defaultAuditShouldNotBeFound("modifiedAt.equals=" + UPDATED_MODIFIED_AT);
    }

    @Test
    @Transactional
    public void getAllAuditsByModifiedAtIsNotEqualToSomething() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where modifiedAt not equals to DEFAULT_MODIFIED_AT
        defaultAuditShouldNotBeFound("modifiedAt.notEquals=" + DEFAULT_MODIFIED_AT);

        // Get all the auditList where modifiedAt not equals to UPDATED_MODIFIED_AT
        defaultAuditShouldBeFound("modifiedAt.notEquals=" + UPDATED_MODIFIED_AT);
    }

    @Test
    @Transactional
    public void getAllAuditsByModifiedAtIsInShouldWork() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where modifiedAt in DEFAULT_MODIFIED_AT or UPDATED_MODIFIED_AT
        defaultAuditShouldBeFound("modifiedAt.in=" + DEFAULT_MODIFIED_AT + "," + UPDATED_MODIFIED_AT);

        // Get all the auditList where modifiedAt equals to UPDATED_MODIFIED_AT
        defaultAuditShouldNotBeFound("modifiedAt.in=" + UPDATED_MODIFIED_AT);
    }

    @Test
    @Transactional
    public void getAllAuditsByModifiedAtIsNullOrNotNull() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where modifiedAt is not null
        defaultAuditShouldBeFound("modifiedAt.specified=true");

        // Get all the auditList where modifiedAt is null
        defaultAuditShouldNotBeFound("modifiedAt.specified=false");
    }

    @Test
    @Transactional
    public void getAllAuditsByModifiedAtIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where modifiedAt is greater than or equal to DEFAULT_MODIFIED_AT
        defaultAuditShouldBeFound("modifiedAt.greaterThanOrEqual=" + DEFAULT_MODIFIED_AT);

        // Get all the auditList where modifiedAt is greater than or equal to UPDATED_MODIFIED_AT
        defaultAuditShouldNotBeFound("modifiedAt.greaterThanOrEqual=" + UPDATED_MODIFIED_AT);
    }

    @Test
    @Transactional
    public void getAllAuditsByModifiedAtIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where modifiedAt is less than or equal to DEFAULT_MODIFIED_AT
        defaultAuditShouldBeFound("modifiedAt.lessThanOrEqual=" + DEFAULT_MODIFIED_AT);

        // Get all the auditList where modifiedAt is less than or equal to SMALLER_MODIFIED_AT
        defaultAuditShouldNotBeFound("modifiedAt.lessThanOrEqual=" + SMALLER_MODIFIED_AT);
    }

    @Test
    @Transactional
    public void getAllAuditsByModifiedAtIsLessThanSomething() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where modifiedAt is less than DEFAULT_MODIFIED_AT
        defaultAuditShouldNotBeFound("modifiedAt.lessThan=" + DEFAULT_MODIFIED_AT);

        // Get all the auditList where modifiedAt is less than UPDATED_MODIFIED_AT
        defaultAuditShouldBeFound("modifiedAt.lessThan=" + UPDATED_MODIFIED_AT);
    }

    @Test
    @Transactional
    public void getAllAuditsByModifiedAtIsGreaterThanSomething() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        // Get all the auditList where modifiedAt is greater than DEFAULT_MODIFIED_AT
        defaultAuditShouldNotBeFound("modifiedAt.greaterThan=" + DEFAULT_MODIFIED_AT);

        // Get all the auditList where modifiedAt is greater than SMALLER_MODIFIED_AT
        defaultAuditShouldBeFound("modifiedAt.greaterThan=" + SMALLER_MODIFIED_AT);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultAuditShouldBeFound(String filter) throws Exception {
        restAuditMockMvc.perform(get("/api/audits?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(audit.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(sameInstant(DEFAULT_CREATED_AT))))
            .andExpect(jsonPath("$.[*].modifiedAt").value(hasItem(sameInstant(DEFAULT_MODIFIED_AT))));

        // Check, that the count call also returns 1
        restAuditMockMvc.perform(get("/api/audits/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultAuditShouldNotBeFound(String filter) throws Exception {
        restAuditMockMvc.perform(get("/api/audits?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restAuditMockMvc.perform(get("/api/audits/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingAudit() throws Exception {
        // Get the audit
        restAuditMockMvc.perform(get("/api/audits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAudit() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        int databaseSizeBeforeUpdate = auditRepository.findAll().size();

        // Update the audit
        Audit updatedAudit = auditRepository.findById(audit.getId()).get();
        // Disconnect from session so that the updates on updatedAudit are not directly saved in db
        em.detach(updatedAudit);
        updatedAudit
            .createdAt(UPDATED_CREATED_AT)
            .modifiedAt(UPDATED_MODIFIED_AT);
        AuditDTO auditDTO = auditMapper.toDto(updatedAudit);

        restAuditMockMvc.perform(put("/api/audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditDTO)))
            .andExpect(status().isOk());

        // Validate the Audit in the database
        List<Audit> auditList = auditRepository.findAll();
        assertThat(auditList).hasSize(databaseSizeBeforeUpdate);
        Audit testAudit = auditList.get(auditList.size() - 1);
        assertThat(testAudit.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testAudit.getModifiedAt()).isEqualTo(UPDATED_MODIFIED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingAudit() throws Exception {
        int databaseSizeBeforeUpdate = auditRepository.findAll().size();

        // Create the Audit
        AuditDTO auditDTO = auditMapper.toDto(audit);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAuditMockMvc.perform(put("/api/audits")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Audit in the database
        List<Audit> auditList = auditRepository.findAll();
        assertThat(auditList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAudit() throws Exception {
        // Initialize the database
        auditRepository.saveAndFlush(audit);

        int databaseSizeBeforeDelete = auditRepository.findAll().size();

        // Delete the audit
        restAuditMockMvc.perform(delete("/api/audits/{id}", audit.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Audit> auditList = auditRepository.findAll();
        assertThat(auditList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
