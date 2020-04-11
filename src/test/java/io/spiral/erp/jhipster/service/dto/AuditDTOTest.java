package io.spiral.erp.jhipster.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.spiral.erp.jhipster.web.rest.TestUtil;

public class AuditDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AuditDTO.class);
        AuditDTO auditDTO1 = new AuditDTO();
        auditDTO1.setId(1L);
        AuditDTO auditDTO2 = new AuditDTO();
        assertThat(auditDTO1).isNotEqualTo(auditDTO2);
        auditDTO2.setId(auditDTO1.getId());
        assertThat(auditDTO1).isEqualTo(auditDTO2);
        auditDTO2.setId(2L);
        assertThat(auditDTO1).isNotEqualTo(auditDTO2);
        auditDTO1.setId(null);
        assertThat(auditDTO1).isNotEqualTo(auditDTO2);
    }
}
