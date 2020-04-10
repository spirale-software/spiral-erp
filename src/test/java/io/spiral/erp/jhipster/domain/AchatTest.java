package io.spiral.erp.jhipster.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import io.spiral.erp.jhipster.web.rest.TestUtil;

public class AchatTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Achat.class);
        Achat achat1 = new Achat();
        achat1.setId(1L);
        Achat achat2 = new Achat();
        achat2.setId(achat1.getId());
        assertThat(achat1).isEqualTo(achat2);
        achat2.setId(2L);
        assertThat(achat1).isNotEqualTo(achat2);
        achat1.setId(null);
        assertThat(achat1).isNotEqualTo(achat2);
    }
}
