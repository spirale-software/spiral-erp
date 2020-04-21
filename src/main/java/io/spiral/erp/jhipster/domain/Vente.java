package io.spiral.erp.jhipster.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Vente.
 */
@Entity
@Table(name = "vente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Vente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "taux_tva")
    private Double tauxTVA;

    @Column(name = "quantite_vendu")
    private Integer quantiteVendu;

    @Column(name = "prix_unitaire_vente")
    private Double prixUnitaireVente;

    @OneToOne
    @JoinColumn(unique = true)
    private Audit audit;

    @ManyToOne
    @JsonIgnoreProperties("ventes")
    private Utilisateur vendeur;

    @ManyToOne
    @JsonIgnoreProperties("ventes")
    private Article article;

    @ManyToOne
    @JsonIgnoreProperties("ventes")
    private Entreprise entreprise;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getTauxTVA() {
        return tauxTVA;
    }

    public Vente tauxTVA(Double tauxTVA) {
        this.tauxTVA = tauxTVA;
        return this;
    }

    public void setTauxTVA(Double tauxTVA) {
        this.tauxTVA = tauxTVA;
    }

    public Integer getQuantiteVendu() {
        return quantiteVendu;
    }

    public Vente quantiteVendu(Integer quantiteVendu) {
        this.quantiteVendu = quantiteVendu;
        return this;
    }

    public void setQuantiteVendu(Integer quantiteVendu) {
        this.quantiteVendu = quantiteVendu;
    }

    public Double getPrixUnitaireVente() {
        return prixUnitaireVente;
    }

    public Vente prixUnitaireVente(Double prixUnitaireVente) {
        this.prixUnitaireVente = prixUnitaireVente;
        return this;
    }

    public void setPrixUnitaireVente(Double prixUnitaireVente) {
        this.prixUnitaireVente = prixUnitaireVente;
    }

    public Audit getAudit() {
        return audit;
    }

    public Vente audit(Audit audit) {
        this.audit = audit;
        return this;
    }

    public void setAudit(Audit audit) {
        this.audit = audit;
    }

    public Utilisateur getVendeur() {
        return vendeur;
    }

    public Vente vendeur(Utilisateur utilisateur) {
        this.vendeur = utilisateur;
        return this;
    }

    public void setVendeur(Utilisateur utilisateur) {
        this.vendeur = utilisateur;
    }

    public Article getArticle() {
        return article;
    }

    public Vente article(Article article) {
        this.article = article;
        return this;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Entreprise getEntreprise() {
        return entreprise;
    }

    public Vente entreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
        return this;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vente)) {
            return false;
        }
        return id != null && id.equals(((Vente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Vente{" +
            "id=" + getId() +
            ", tauxTVA=" + getTauxTVA() +
            ", quantiteVendu=" + getQuantiteVendu() +
            ", prixUnitaireVente=" + getPrixUnitaireVente() +
            "}";
    }
}
