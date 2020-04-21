import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SpiralErpTestModule } from '../../../test.module';
import { DepenseUpdateComponent } from 'app/entities/depense/depense-update.component';
import { DepenseService } from 'app/entities/depense/depense.service';
import { Depense } from 'app/shared/model/depense.model';

describe('Component Tests', () => {
  describe('Depense Management Update Component', () => {
    let comp: DepenseUpdateComponent;
    let fixture: ComponentFixture<DepenseUpdateComponent>;
    let service: DepenseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SpiralErpTestModule],
        declarations: [DepenseUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DepenseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepenseUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepenseService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Depense(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Depense();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
