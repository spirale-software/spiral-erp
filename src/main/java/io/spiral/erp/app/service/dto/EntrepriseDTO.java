package io.spiral.erp.app.service.dto;

import io.spiral.erp.jhipster.service.dto.AuditDTO;

public class EntrepriseDTO {
    private Long id;
    private String nom;
    private AuditDTO audit;

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

    public AuditDTO getAudit() {
        return audit;
    }

    public void setAudit(AuditDTO audit) {
        this.audit = audit;
    }
}
