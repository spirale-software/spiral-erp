package io.spiral.erp.app.service.dto;

import io.spiral.erp.jhipster.service.dto.AuditDTO;

public class ArticleDTO {
    private Long id;
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
}
