import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpiralErpTestModule } from '../../../test.module';
import { AchatComponent } from 'app/entities/achat/achat.component';
import { AchatService } from 'app/entities/achat/achat.service';
import { Achat } from 'app/shared/model/achat.model';

describe('Component Tests', () => {
  describe('Achat Management Component', () => {
    let comp: AchatComponent;
    let fixture: ComponentFixture<AchatComponent>;
    let service: AchatService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SpiralErpTestModule],
        declarations: [AchatComponent],
        providers: []
      })
        .overrideTemplate(AchatComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AchatComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AchatService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Achat(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.achats && comp.achats[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
