package io.spiral.erp.jhipster.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link io.spiral.erp.jhipster.domain.Article} entity. This class is used
 * in {@link io.spiral.erp.jhipster.web.rest.ArticleResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /articles?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ArticleCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nom;

    private StringFilter numero;

    private LongFilter auditId;

    private LongFilter entrepriseId;

    public ArticleCriteria(){
    }

    public ArticleCriteria(ArticleCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.nom = other.nom == null ? null : other.nom.copy();
        this.numero = other.numero == null ? null : other.numero.copy();
        this.auditId = other.auditId == null ? null : other.auditId.copy();
        this.entrepriseId = other.entrepriseId == null ? null : other.entrepriseId.copy();
    }

    @Override
    public ArticleCriteria copy() {
        return new ArticleCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNom() {
        return nom;
    }

    public void setNom(StringFilter nom) {
        this.nom = nom;
    }

    public StringFilter getNumero() {
        return numero;
    }

    public void setNumero(StringFilter numero) {
        this.numero = numero;
    }

    public LongFilter getAuditId() {
        return auditId;
    }

    public void setAuditId(LongFilter auditId) {
        this.auditId = auditId;
    }

    public LongFilter getEntrepriseId() {
        return entrepriseId;
    }

    public void setEntrepriseId(LongFilter entrepriseId) {
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
        final ArticleCriteria that = (ArticleCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nom, that.nom) &&
            Objects.equals(numero, that.numero) &&
            Objects.equals(auditId, that.auditId) &&
            Objects.equals(entrepriseId, that.entrepriseId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nom,
        numero,
        auditId,
        entrepriseId
        );
    }

    @Override
    public String toString() {
        return "ArticleCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nom != null ? "nom=" + nom + ", " : "") +
                (numero != null ? "numero=" + numero + ", " : "") +
                (auditId != null ? "auditId=" + auditId + ", " : "") +
                (entrepriseId != null ? "entrepriseId=" + entrepriseId + ", " : "") +
            "}";
    }

}
