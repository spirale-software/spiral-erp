package io.spiral.erp.jhipster.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link io.spiral.erp.jhipster.domain.Article} entity.
 */
public class ArticleDTO implements Serializable {

    private Long id;

    private String nom;

    private String numero;


    private Long auditId;

    private Long entrepriseId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Long getAuditId() {
        return auditId;
    }

    public void setAuditId(Long auditId) {
        this.auditId = auditId;
    }

    public Long getEntrepriseId() {
        return entrepriseId;
    }

    public void setEntrepriseId(Long entrepriseId) {
        this.entrepriseId = entrepriseId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ArticleDTO articleDTO = (ArticleDTO) o;
        if (articleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), articleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ArticleDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", numero='" + getNumero() + "'" +
            ", auditId=" + getAuditId() +
            ", entrepriseId=" + getEntrepriseId() +
            "}";
    }
}
