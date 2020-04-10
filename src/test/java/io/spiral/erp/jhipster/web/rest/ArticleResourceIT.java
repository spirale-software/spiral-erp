package io.spiral.erp.jhipster.web.rest;

import io.spiral.erp.jhipster.SpiralErpApp;
import io.spiral.erp.jhipster.domain.Article;
import io.spiral.erp.jhipster.domain.Audit;
import io.spiral.erp.jhipster.domain.Entreprise;
import io.spiral.erp.jhipster.repository.ArticleRepository;
import io.spiral.erp.jhipster.service.ArticleService;
import io.spiral.erp.jhipster.service.dto.ArticleDTO;
import io.spiral.erp.jhipster.service.mapper.ArticleMapper;
import io.spiral.erp.jhipster.web.rest.errors.ExceptionTranslator;
import io.spiral.erp.jhipster.service.dto.ArticleCriteria;
import io.spiral.erp.jhipster.service.ArticleQueryService;

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
import java.util.List;

import static io.spiral.erp.jhipster.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ArticleResource} REST controller.
 */
@SpringBootTest(classes = SpiralErpApp.class)
public class ArticleResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO = "BBBBBBBBBB";

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleMapper articleMapper;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private ArticleQueryService articleQueryService;

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

    private MockMvc restArticleMockMvc;

    private Article article;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticleResource articleResource = new ArticleResource(articleService, articleQueryService);
        this.restArticleMockMvc = MockMvcBuilders.standaloneSetup(articleResource)
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
    public static Article createEntity(EntityManager em) {
        Article article = new Article()
            .nom(DEFAULT_NOM)
            .numero(DEFAULT_NUMERO);
        return article;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Article createUpdatedEntity(EntityManager em) {
        Article article = new Article()
            .nom(UPDATED_NOM)
            .numero(UPDATED_NUMERO);
        return article;
    }

    @BeforeEach
    public void initTest() {
        article = createEntity(em);
    }

    @Test
    @Transactional
    public void createArticle() throws Exception {
        int databaseSizeBeforeCreate = articleRepository.findAll().size();

        // Create the Article
        ArticleDTO articleDTO = articleMapper.toDto(article);
        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isCreated());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeCreate + 1);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testArticle.getNumero()).isEqualTo(DEFAULT_NUMERO);
    }

    @Test
    @Transactional
    public void createArticleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articleRepository.findAll().size();

        // Create the Article with an existing ID
        article.setId(1L);
        ArticleDTO articleDTO = articleMapper.toDto(article);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllArticles() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList
        restArticleMockMvc.perform(get("/api/articles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(article.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)));
    }
    
    @Test
    @Transactional
    public void getArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get the article
        restArticleMockMvc.perform(get("/api/articles/{id}", article.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(article.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO));
    }


    @Test
    @Transactional
    public void getArticlesByIdFiltering() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        Long id = article.getId();

        defaultArticleShouldBeFound("id.equals=" + id);
        defaultArticleShouldNotBeFound("id.notEquals=" + id);

        defaultArticleShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultArticleShouldNotBeFound("id.greaterThan=" + id);

        defaultArticleShouldBeFound("id.lessThanOrEqual=" + id);
        defaultArticleShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllArticlesByNomIsEqualToSomething() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList where nom equals to DEFAULT_NOM
        defaultArticleShouldBeFound("nom.equals=" + DEFAULT_NOM);

        // Get all the articleList where nom equals to UPDATED_NOM
        defaultArticleShouldNotBeFound("nom.equals=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllArticlesByNomIsNotEqualToSomething() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList where nom not equals to DEFAULT_NOM
        defaultArticleShouldNotBeFound("nom.notEquals=" + DEFAULT_NOM);

        // Get all the articleList where nom not equals to UPDATED_NOM
        defaultArticleShouldBeFound("nom.notEquals=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllArticlesByNomIsInShouldWork() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList where nom in DEFAULT_NOM or UPDATED_NOM
        defaultArticleShouldBeFound("nom.in=" + DEFAULT_NOM + "," + UPDATED_NOM);

        // Get all the articleList where nom equals to UPDATED_NOM
        defaultArticleShouldNotBeFound("nom.in=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllArticlesByNomIsNullOrNotNull() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList where nom is not null
        defaultArticleShouldBeFound("nom.specified=true");

        // Get all the articleList where nom is null
        defaultArticleShouldNotBeFound("nom.specified=false");
    }
                @Test
    @Transactional
    public void getAllArticlesByNomContainsSomething() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList where nom contains DEFAULT_NOM
        defaultArticleShouldBeFound("nom.contains=" + DEFAULT_NOM);

        // Get all the articleList where nom contains UPDATED_NOM
        defaultArticleShouldNotBeFound("nom.contains=" + UPDATED_NOM);
    }

    @Test
    @Transactional
    public void getAllArticlesByNomNotContainsSomething() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList where nom does not contain DEFAULT_NOM
        defaultArticleShouldNotBeFound("nom.doesNotContain=" + DEFAULT_NOM);

        // Get all the articleList where nom does not contain UPDATED_NOM
        defaultArticleShouldBeFound("nom.doesNotContain=" + UPDATED_NOM);
    }


    @Test
    @Transactional
    public void getAllArticlesByNumeroIsEqualToSomething() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList where numero equals to DEFAULT_NUMERO
        defaultArticleShouldBeFound("numero.equals=" + DEFAULT_NUMERO);

        // Get all the articleList where numero equals to UPDATED_NUMERO
        defaultArticleShouldNotBeFound("numero.equals=" + UPDATED_NUMERO);
    }

    @Test
    @Transactional
    public void getAllArticlesByNumeroIsNotEqualToSomething() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList where numero not equals to DEFAULT_NUMERO
        defaultArticleShouldNotBeFound("numero.notEquals=" + DEFAULT_NUMERO);

        // Get all the articleList where numero not equals to UPDATED_NUMERO
        defaultArticleShouldBeFound("numero.notEquals=" + UPDATED_NUMERO);
    }

    @Test
    @Transactional
    public void getAllArticlesByNumeroIsInShouldWork() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList where numero in DEFAULT_NUMERO or UPDATED_NUMERO
        defaultArticleShouldBeFound("numero.in=" + DEFAULT_NUMERO + "," + UPDATED_NUMERO);

        // Get all the articleList where numero equals to UPDATED_NUMERO
        defaultArticleShouldNotBeFound("numero.in=" + UPDATED_NUMERO);
    }

    @Test
    @Transactional
    public void getAllArticlesByNumeroIsNullOrNotNull() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList where numero is not null
        defaultArticleShouldBeFound("numero.specified=true");

        // Get all the articleList where numero is null
        defaultArticleShouldNotBeFound("numero.specified=false");
    }
                @Test
    @Transactional
    public void getAllArticlesByNumeroContainsSomething() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList where numero contains DEFAULT_NUMERO
        defaultArticleShouldBeFound("numero.contains=" + DEFAULT_NUMERO);

        // Get all the articleList where numero contains UPDATED_NUMERO
        defaultArticleShouldNotBeFound("numero.contains=" + UPDATED_NUMERO);
    }

    @Test
    @Transactional
    public void getAllArticlesByNumeroNotContainsSomething() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        // Get all the articleList where numero does not contain DEFAULT_NUMERO
        defaultArticleShouldNotBeFound("numero.doesNotContain=" + DEFAULT_NUMERO);

        // Get all the articleList where numero does not contain UPDATED_NUMERO
        defaultArticleShouldBeFound("numero.doesNotContain=" + UPDATED_NUMERO);
    }


    @Test
    @Transactional
    public void getAllArticlesByAuditIsEqualToSomething() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);
        Audit audit = AuditResourceIT.createEntity(em);
        em.persist(audit);
        em.flush();
        article.setAudit(audit);
        articleRepository.saveAndFlush(article);
        Long auditId = audit.getId();

        // Get all the articleList where audit equals to auditId
        defaultArticleShouldBeFound("auditId.equals=" + auditId);

        // Get all the articleList where audit equals to auditId + 1
        defaultArticleShouldNotBeFound("auditId.equals=" + (auditId + 1));
    }


    @Test
    @Transactional
    public void getAllArticlesByEntrepriseIsEqualToSomething() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);
        Entreprise entreprise = EntrepriseResourceIT.createEntity(em);
        em.persist(entreprise);
        em.flush();
        article.setEntreprise(entreprise);
        articleRepository.saveAndFlush(article);
        Long entrepriseId = entreprise.getId();

        // Get all the articleList where entreprise equals to entrepriseId
        defaultArticleShouldBeFound("entrepriseId.equals=" + entrepriseId);

        // Get all the articleList where entreprise equals to entrepriseId + 1
        defaultArticleShouldNotBeFound("entrepriseId.equals=" + (entrepriseId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultArticleShouldBeFound(String filter) throws Exception {
        restArticleMockMvc.perform(get("/api/articles?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(article.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)));

        // Check, that the count call also returns 1
        restArticleMockMvc.perform(get("/api/articles/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultArticleShouldNotBeFound(String filter) throws Exception {
        restArticleMockMvc.perform(get("/api/articles?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restArticleMockMvc.perform(get("/api/articles/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingArticle() throws Exception {
        // Get the article
        restArticleMockMvc.perform(get("/api/articles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // Update the article
        Article updatedArticle = articleRepository.findById(article.getId()).get();
        // Disconnect from session so that the updates on updatedArticle are not directly saved in db
        em.detach(updatedArticle);
        updatedArticle
            .nom(UPDATED_NOM)
            .numero(UPDATED_NUMERO);
        ArticleDTO articleDTO = articleMapper.toDto(updatedArticle);

        restArticleMockMvc.perform(put("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isOk());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testArticle.getNumero()).isEqualTo(UPDATED_NUMERO);
    }

    @Test
    @Transactional
    public void updateNonExistingArticle() throws Exception {
        int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // Create the Article
        ArticleDTO articleDTO = articleMapper.toDto(article);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticleMockMvc.perform(put("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArticle() throws Exception {
        // Initialize the database
        articleRepository.saveAndFlush(article);

        int databaseSizeBeforeDelete = articleRepository.findAll().size();

        // Delete the article
        restArticleMockMvc.perform(delete("/api/articles/{id}", article.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
