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
import io.github.jhipster.service.filter.ZonedDateTimeFilter;

/**
 * Criteria class for the {@link io.spiral.erp.jhipster.domain.Audit} entity. This class is used
 * in {@link io.spiral.erp.jhipster.web.rest.AuditResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /audits?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class AuditCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private ZonedDateTimeFilter createdAt;

    private ZonedDateTimeFilter modifiedAt;

    public AuditCriteria(){
    }

    public AuditCriteria(AuditCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.createdAt = other.createdAt == null ? null : other.createdAt.copy();
        this.modifiedAt = other.modifiedAt == null ? null : other.modifiedAt.copy();
    }

    @Override
    public AuditCriteria copy() {
        return new AuditCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public ZonedDateTimeFilter getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTimeFilter createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTimeFilter getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(ZonedDateTimeFilter modifiedAt) {
        this.modifiedAt = modifiedAt;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final AuditCriteria that = (AuditCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(createdAt, that.createdAt) &&
            Objects.equals(modifiedAt, that.modifiedAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        createdAt,
        modifiedAt
        );
    }

    @Override
    public String toString() {
        return "AuditCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (createdAt != null ? "createdAt=" + createdAt + ", " : "") +
                (modifiedAt != null ? "modifiedAt=" + modifiedAt + ", " : "") +
            "}";
    }

}
