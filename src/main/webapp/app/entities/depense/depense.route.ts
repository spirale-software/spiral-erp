import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDepense, Depense } from 'app/shared/model/depense.model';
import { DepenseService } from './depense.service';
import { DepenseComponent } from './depense.component';
import { DepenseDetailComponent } from './depense-detail.component';
import { DepenseUpdateComponent } from './depense-update.component';

@Injectable({ providedIn: 'root' })
export class DepenseResolve implements Resolve<IDepense> {
  constructor(private service: DepenseService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepense> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((depense: HttpResponse<Depense>) => {
          if (depense.body) {
            return of(depense.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Depense());
  }
}

export const depenseRoute: Routes = [
  {
    path: '',
    component: DepenseComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'spiralErpApp.depense.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DepenseDetailComponent,
    resolve: {
      depense: DepenseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'spiralErpApp.depense.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DepenseUpdateComponent,
    resolve: {
      depense: DepenseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'spiralErpApp.depense.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DepenseUpdateComponent,
    resolve: {
      depense: DepenseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'spiralErpApp.depense.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
