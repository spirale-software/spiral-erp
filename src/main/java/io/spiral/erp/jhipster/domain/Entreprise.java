package io.spiral.erp.jhipster.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Entreprise.
 */
@Entity
@Table(name = "entreprise")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Entreprise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @OneToOne
    @JoinColumn(unique = true)
    private Audit audit;

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Article> articles = new HashSet<>();

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Fournisseur> fournisseurs = new HashSet<>();

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Achat> achats = new HashSet<>();

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Utilisateur> utilisateurs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Entreprise nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Audit getAudit() {
        return audit;
    }

    public Entreprise audit(Audit audit) {
        this.audit = audit;
        return this;
    }

    public void setAudit(Audit audit) {
        this.audit = audit;
    }

    public Set<Article> getArticles() {
        return articles;
    }

    public Entreprise articles(Set<Article> articles) {
        this.articles = articles;
        return this;
    }

    public Entreprise addArticle(Article article) {
        this.articles.add(article);
        article.setEntreprise(this);
        return this;
    }

    public Entreprise removeArticle(Article article) {
        this.articles.remove(article);
        article.setEntreprise(null);
        return this;
    }

    public void setArticles(Set<Article> articles) {
        this.articles = articles;
    }

    public Set<Fournisseur> getFournisseurs() {
        return fournisseurs;
    }

    public Entreprise fournisseurs(Set<Fournisseur> fournisseurs) {
        this.fournisseurs = fournisseurs;
        return this;
    }

    public Entreprise addFournisseur(Fournisseur fournisseur) {
        this.fournisseurs.add(fournisseur);
        fournisseur.setEntreprise(this);
        return this;
    }

    public Entreprise removeFournisseur(Fournisseur fournisseur) {
        this.fournisseurs.remove(fournisseur);
        fournisseur.setEntreprise(null);
        return this;
    }

    public void setFournisseurs(Set<Fournisseur> fournisseurs) {
        this.fournisseurs = fournisseurs;
    }

    public Set<Achat> getAchats() {
        return achats;
    }

    public Entreprise achats(Set<Achat> achats) {
        this.achats = achats;
        return this;
    }

    public Entreprise addAchat(Achat achat) {
        this.achats.add(achat);
        achat.setEntreprise(this);
        return this;
    }

    public Entreprise removeAchat(Achat achat) {
        this.achats.remove(achat);
        achat.setEntreprise(null);
        return this;
    }

    public void setAchats(Set<Achat> achats) {
        this.achats = achats;
    }

    public Set<Utilisateur> getUtilisateurs() {
        return utilisateurs;
    }

    public Entreprise utilisateurs(Set<Utilisateur> utilisateurs) {
        this.utilisateurs = utilisateurs;
        return this;
    }

    public Entreprise addUtilisateur(Utilisateur utilisateur) {
        this.utilisateurs.add(utilisateur);
        utilisateur.setEntreprise(this);
        return this;
    }

    public Entreprise removeUtilisateur(Utilisateur utilisateur) {
        this.utilisateurs.remove(utilisateur);
        utilisateur.setEntreprise(null);
        return this;
    }

    public void setUtilisateurs(Set<Utilisateur> utilisateurs) {
        this.utilisateurs = utilisateurs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Entreprise)) {
            return false;
        }
        return id != null && id.equals(((Entreprise) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Entreprise{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            "}";
    }
}
