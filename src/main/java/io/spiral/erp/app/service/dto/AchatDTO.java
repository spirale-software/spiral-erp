package io.spiral.erp.app.service.dto;

import java.time.ZonedDateTime;

public class AchatDTO {
    private Long id;
    private Long idAcheteur;
    private String nomAcheteur;
    private String loginAcheteur;
    private ZonedDateTime dateAchat;
    private Long idArticle;
    private String nomArticle;
    private Double prixUnitaire;
    private Integer quantite;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateAchat() {
        return dateAchat;
    }

    public void setDateAchat(ZonedDateTime dateAchat) {
        this.dateAchat = dateAchat;
    }

    public Long getIdArticle() {
        return idArticle;
    }

    public void setIdArticle(Long idArticle) {
        this.idArticle = idArticle;
    }

    public String getNomArticle() {
        return nomArticle;
    }

    public void setNomArticle(String nomArticle) {
        this.nomArticle = nomArticle;
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

    public Long getIdAcheteur() {
        return idAcheteur;
    }

    public void setIdAcheteur(Long idAcheteur) {
        this.idAcheteur = idAcheteur;
    }

    public String getNomAcheteur() {
        return nomAcheteur;
    }

    public void setNomAcheteur(String nomAcheteur) {
        this.nomAcheteur = nomAcheteur;
    }

    public String getLoginAcheteur() {
        return loginAcheteur;
    }

    public void setLoginAcheteur(String loginAcheteur) {
        this.loginAcheteur = loginAcheteur;
    }
}
