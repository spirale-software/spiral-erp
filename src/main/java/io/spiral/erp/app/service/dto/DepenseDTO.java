package io.spiral.erp.app.service.dto;

import java.time.ZonedDateTime;

public class DepenseDTO {
    private Long id;
    private String description;
    private String typeDepense;
    private ZonedDateTime dateDepense;
    private Double montant;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTypeDepense() {
        return typeDepense;
    }

    public void setTypeDepense(String typeDepense) {
        this.typeDepense = typeDepense;
    }

    public ZonedDateTime getDateDepense() {
        return dateDepense;
    }

    public void setDateDepense(ZonedDateTime dateDepense) {
        this.dateDepense = dateDepense;
    }

    public Double getMontant() {
        return montant;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }
}
