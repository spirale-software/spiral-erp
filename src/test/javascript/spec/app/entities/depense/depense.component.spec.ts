import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpiralErpTestModule } from '../../../test.module';
import { DepenseComponent } from 'app/entities/depense/depense.component';
import { DepenseService } from 'app/entities/depense/depense.service';
import { Depense } from 'app/shared/model/depense.model';

describe('Component Tests', () => {
  describe('Depense Management Component', () => {
    let comp: DepenseComponent;
    let fixture: ComponentFixture<DepenseComponent>;
    let service: DepenseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SpiralErpTestModule],
        declarations: [DepenseComponent],
        providers: []
      })
        .overrideTemplate(DepenseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepenseComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepenseService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Depense(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.depenses && comp.depenses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
