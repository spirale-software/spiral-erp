package io.spiral.erp.app.service.dto;

import java.time.ZonedDateTime;

public class VenteDTO {
    private Long id;
    private Long idVendeur;
    private String nomVendeur;
    private ZonedDateTime dateVente;
    private String nomProduit;
    private Long idProduit;
    private Double prixUnitaireVente;
    private Integer quantiteVendu;
    private Double tauxTVA;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdVendeur() {
        return idVendeur;
    }

    public void setIdVendeur(Long idVendeur) {
        this.idVendeur = idVendeur;
    }

    public String getNomVendeur() {
        return nomVendeur;
    }

    public void setNomVendeur(String nomVendeur) {
        this.nomVendeur = nomVendeur;
    }

    public ZonedDateTime getDateVente() {
        return dateVente;
    }

    public void setDateVente(ZonedDateTime dateVente) {
        this.dateVente = dateVente;
    }

    public String getNomProduit() {
        return nomProduit;
    }

    public void setNomProduit(String nomProduit) {
        this.nomProduit = nomProduit;
    }

    public Long getIdProduit() {
        return idProduit;
    }

    public void setIdProduit(Long idProduit) {
        this.idProduit = idProduit;
    }

    public Double getPrixUnitaireVente() {
        return prixUnitaireVente;
    }

    public void setPrixUnitaireVente(Double prixUnitaireVente) {
        this.prixUnitaireVente = prixUnitaireVente;
    }

    public Integer getQuantiteVendu() {
        return quantiteVendu;
    }

    public void setQuantiteVendu(Integer quantiteVendu) {
        this.quantiteVendu = quantiteVendu;
    }

    public Double getTauxTVA() {
        return tauxTVA;
    }

    public void setTauxTVA(Double tauxTVA) {
        this.tauxTVA = tauxTVA;
    }
}
