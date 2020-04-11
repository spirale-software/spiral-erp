package io.spiral.erp.app.service.dto;

import io.spiral.erp.jhipster.service.dto.AuditDTO;

import javax.validation.constraints.NotNull;

public class ArticleDTO {
    private Long id;
    @NotNull
    private String nom;
    private String code;
    private String numero;
    private AuditDTO audit;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public AuditDTO getAudit() {
        return audit;
    }

    public void setAudit(AuditDTO audit) {
        this.audit = audit;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    @Override
    public String toString() {
        return "ArticleDTO{" +
            "id=" + id +
            ", nom='" + nom + '\'' +
            ", code='" + code + '\'' +
            ", numero='" + numero + '\'' +
            ", audit=" + audit +
            '}';
    }
}
