import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpiralErpTestModule } from '../../../test.module';
import { EntrepriseDetailComponent } from 'app/entities/entreprise/entreprise-detail.component';
import { Entreprise } from 'app/shared/model/entreprise.model';

describe('Component Tests', () => {
  describe('Entreprise Management Detail Component', () => {
    let comp: EntrepriseDetailComponent;
    let fixture: ComponentFixture<EntrepriseDetailComponent>;
    const route = ({ data: of({ entreprise: new Entreprise(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SpiralErpTestModule],
        declarations: [EntrepriseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EntrepriseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EntrepriseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load entreprise on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.entreprise).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
