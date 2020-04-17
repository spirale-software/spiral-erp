package io.spiral.erp.jhipster.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Achat.
 */
@Entity
@Table(name = "achat")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Achat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date_achat")
    private ZonedDateTime dateAchat;

    @Column(name = "prix_unitaire")
    private Double prixUnitaire;

    @Column(name = "quantite")
    private Integer quantite;

    @OneToOne
    @JoinColumn(unique = true)
    private Audit audit;

    @ManyToOne
    @JsonIgnoreProperties("achats")
    private Utilisateur acheteur;

    @ManyToOne
    @JsonIgnoreProperties("achats")
    private Article article;

    @ManyToOne
    @JsonIgnoreProperties("achats")
    private Entreprise entreprise;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateAchat() {
        return dateAchat;
    }

    public Achat dateAchat(ZonedDateTime dateAchat) {
        this.dateAchat = dateAchat;
        return this;
    }

    public void setDateAchat(ZonedDateTime dateAchat) {
        this.dateAchat = dateAchat;
    }

    public Double getPrixUnitaire() {
        return prixUnitaire;
    }

    public Achat prixUnitaire(Double prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
        return this;
    }

    public void setPrixUnitaire(Double prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public Achat quantite(Integer quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Audit getAudit() {
        return audit;
    }

    public Achat audit(Audit audit) {
        this.audit = audit;
        return this;
    }

    public void setAudit(Audit audit) {
        this.audit = audit;
    }

    public Utilisateur getAcheteur() {
        return acheteur;
    }

    public Achat acheteur(Utilisateur utilisateur) {
        this.acheteur = utilisateur;
        return this;
    }

    public void setAcheteur(Utilisateur utilisateur) {
        this.acheteur = utilisateur;
    }

    public Article getArticle() {
        return article;
    }

    public Achat article(Article article) {
        this.article = article;
        return this;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Entreprise getEntreprise() {
        return entreprise;
    }

    public Achat entreprise(Entreprise entreprise) {
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
        if (!(o instanceof Achat)) {
            return false;
        }
        return id != null && id.equals(((Achat) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Achat{" +
            "id=" + getId() +
            ", dateAchat='" + getDateAchat() + "'" +
            ", prixUnitaire=" + getPrixUnitaire() +
            ", quantite=" + getQuantite() +
            "}";
    }
}
