package io.spiral.erp.app.service.dto;

import java.time.ZonedDateTime;

public class AchatDTO {
    private Long id;
    private UtilisateurDTO acheteur;
    private ZonedDateTime dateAchat;
    private ArticleDTO article;
    private Double prixUnitaire;
    private Integer quantite;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UtilisateurDTO getAcheteur() {
        return acheteur;
    }

    public void setAcheteur(UtilisateurDTO acheteur) {
        this.acheteur = acheteur;
    }

    public ZonedDateTime getDateAchat() {
        return dateAchat;
    }

    public void setDateAchat(ZonedDateTime dateAchat) {
        this.dateAchat = dateAchat;
    }

    public ArticleDTO getArticle() {
        return article;
    }

    public void setArticle(ArticleDTO article) {
        this.article = article;
    }

    public Double getPrixUnitaire() {
        return prixUnitaire;
    }

    public void setPrixUnitaire(Double prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }
}
