package io.spiral.erp.jhipster.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Utilisateur.
 */
@Entity
@Table(name = "utilisateur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "telephone")
    private String telephone;

    @OneToOne
    @JoinColumn(unique = true)
    private User jhiUser;

    @OneToMany(mappedBy = "acheteur")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Achat> achats = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("utilisateurs")
    private Entreprise entreprise;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTelephone() {
        return telephone;
    }

    public Utilisateur telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public User getJhiUser() {
        return jhiUser;
    }

    public Utilisateur jhiUser(User user) {
        this.jhiUser = user;
        return this;
    }

    public void setJhiUser(User user) {
        this.jhiUser = user;
    }

    public Set<Achat> getAchats() {
        return achats;
    }

    public Utilisateur achats(Set<Achat> achats) {
        this.achats = achats;
        return this;
    }

    public Utilisateur addAchat(Achat achat) {
        this.achats.add(achat);
        achat.setAcheteur(this);
        return this;
    }

    public Utilisateur removeAchat(Achat achat) {
        this.achats.remove(achat);
        achat.setAcheteur(null);
        return this;
    }

    public void setAchats(Set<Achat> achats) {
        this.achats = achats;
    }

    public Entreprise getEntreprise() {
        return entreprise;
    }

    public Utilisateur entreprise(Entreprise entreprise) {
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
        if (!(o instanceof Utilisateur)) {
            return false;
        }
        return id != null && id.equals(((Utilisateur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Utilisateur{" +
            "id=" + getId() +
            ", telephone='" + getTelephone() + "'" +
            "}";
    }
}
