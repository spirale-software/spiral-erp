package io.spiral.erp.jhipster.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class AuditMapperTest {

    private AuditMapper auditMapper;

    @BeforeEach
    public void setUp() {
        auditMapper = new AuditMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(auditMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(auditMapper.fromId(null)).isNull();
    }
}
