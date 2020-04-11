import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpiralErpTestModule } from '../../../test.module';
import { EntrepriseComponent } from 'app/entities/entreprise/entreprise.component';
import { EntrepriseService } from 'app/entities/entreprise/entreprise.service';
import { Entreprise } from 'app/shared/model/entreprise.model';

describe('Component Tests', () => {
  describe('Entreprise Management Component', () => {
    let comp: EntrepriseComponent;
    let fixture: ComponentFixture<EntrepriseComponent>;
    let service: EntrepriseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SpiralErpTestModule],
        declarations: [EntrepriseComponent],
        providers: []
      })
        .overrideTemplate(EntrepriseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EntrepriseComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EntrepriseService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Entreprise(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.entreprises && comp.entreprises[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
