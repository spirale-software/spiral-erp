import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AchatService } from 'app/entities/achat/achat.service';
import { IAchat, Achat } from 'app/shared/model/achat.model';

describe('Service Tests', () => {
  describe('Achat Service', () => {
    let injector: TestBed;
    let service: AchatService;
    let httpMock: HttpTestingController;
    let elemDefault: IAchat;
    let expectedResult: IAchat | IAchat[] | boolean | null;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AchatService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Achat(0, currentDate, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateAchat: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Achat', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateAchat: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateAchat: currentDate
          },
          returnedFromService
        );
        service
          .create(new Achat())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Achat', () => {
        const returnedFromService = Object.assign(
          {
            dateAchat: currentDate.format(DATE_TIME_FORMAT),
            prixUnitaire: 1,
            quantite: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateAchat: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Achat', () => {
        const returnedFromService = Object.assign(
          {
            dateAchat: currentDate.format(DATE_TIME_FORMAT),
            prixUnitaire: 1,
            quantite: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateAchat: currentDate
          },
          returnedFromService
        );
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Achat', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
