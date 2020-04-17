package io.spiral.erp.app.service;

import io.spiral.erp.app.repository.ArticleAppRepository;
import io.spiral.erp.app.repository.UtilisateurAppRepository;
import io.spiral.erp.app.service.dto.AchatDTO;
import io.spiral.erp.app.service.dto.ArticleDTO;
import io.spiral.erp.app.service.dto.UtilisateurDTO;
import io.spiral.erp.app.service.mapper.AchatMapper;
import io.spiral.erp.jhipster.SpiralErpApp;
import io.spiral.erp.jhipster.domain.Achat;
import io.spiral.erp.jhipster.domain.Article;
import io.spiral.erp.jhipster.domain.User;
import io.spiral.erp.jhipster.domain.Utilisateur;
import io.spiral.erp.jhipster.repository.UserRepository;
import io.swagger.models.auth.In;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = SpiralErpApp.class)
@Transactional
class AchatAppServiceTest {

    final String ARTICLE_NOM = "Livres";
    final String ARTICLE_NUMERO = "ISBN45";
    final Double PRIX_UNITAIRE = 1700.00;
    final Integer QUANTITE = 9;

    final String USER_THREE_LOGIN = "test-user-three";

    @Autowired
    private AchatAppService achatAppService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UtilisateurAppRepository utilisateurAppRepository;

    @Autowired
    private AchatMapper achatMapper;

    @Autowired
    private ArticleAppRepository articleAppRepository;

    @Test
    void create() {
        // GIVEN
        AchatDTO achatDTO = getAchatDTO();

        // WHEN
        AchatDTO resultat = achatAppService.create(achatDTO);

        // THEN
        assertEquals(ARTICLE_NOM, resultat.getArticle().getNom());
        assertEquals(ARTICLE_NUMERO, resultat.getArticle().getNumero());
        assertEquals(PRIX_UNITAIRE, resultat.getPrixUnitaire());
        assertEquals(QUANTITE, resultat.getQuantite());
        assertNotNull(resultat.getDateAchat());
        assertNotNull(resultat.getAcheteur());
    }

    @Test
    public void achatMapperTest() {
        // GIVEN
        AchatDTO achatDTO = getAchatDTO();

        // WHEN
        Achat resultat = achatMapper.toEntity(achatDTO);

        // THEN
        assertEquals(ARTICLE_NOM, resultat.getArticle().getNom());
        assertEquals(ARTICLE_NUMERO, resultat.getArticle().getNumero());
        assertEquals(PRIX_UNITAIRE, resultat.getPrixUnitaire());
        assertEquals(QUANTITE, resultat.getQuantite());
        assertNotNull(resultat.getDateAchat());
        assertNotNull(resultat.getAcheteur());
        assertNotNull(resultat.getAudit());
    }

    private AchatDTO getAchatDTO() {
        AchatDTO achatDTO = new AchatDTO();
        achatDTO.setPrixUnitaire(PRIX_UNITAIRE);
        achatDTO.setQuantite(QUANTITE);
        achatDTO.setArticle(getArticleDTO());

        UtilisateurDTO acheteur = new UtilisateurDTO();
        acheteur.setLogin(USER_THREE_LOGIN);
        achatDTO.setAcheteur(acheteur);

        return achatDTO;
    }

    private ArticleDTO getArticleDTO() {
        ArticleDTO articleDTO = new ArticleDTO();

        Article article = new Article();
        article.setNom(ARTICLE_NOM);
        article.setNumero(ARTICLE_NUMERO);
        article = articleAppRepository.save(article);

        articleDTO.setId(article.getId());
        articleDTO.setNom(article.getNom());
        articleDTO.setNumero(article.getNumero());

        return articleDTO;
    }

    private void setUser() {

         final String USER_THREE_EMAIL = "test-user-three@localhost";
        User userThree = new User();
        userThree.setLogin(USER_THREE_LOGIN);
        userThree.setPassword(RandomStringUtils.random(60));
        userThree.setActivated(false);
        userThree.setEmail(USER_THREE_EMAIL);
        userThree.setFirstName("userThree");
        userThree.setLastName("doe");
        userThree.setLangKey("en");
        User jhiUser = userRepository.save(userThree);

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setJhiUser(jhiUser);
        utilisateurAppRepository.save(utilisateur);
    }
}
