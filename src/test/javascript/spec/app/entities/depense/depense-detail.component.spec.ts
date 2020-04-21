import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpiralErpTestModule } from '../../../test.module';
import { DepenseDetailComponent } from 'app/entities/depense/depense-detail.component';
import { Depense } from 'app/shared/model/depense.model';

describe('Component Tests', () => {
  describe('Depense Management Detail Component', () => {
    let comp: DepenseDetailComponent;
    let fixture: ComponentFixture<DepenseDetailComponent>;
    const route = ({ data: of({ depense: new Depense(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SpiralErpTestModule],
        declarations: [DepenseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DepenseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepenseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load depense on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.depense).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
