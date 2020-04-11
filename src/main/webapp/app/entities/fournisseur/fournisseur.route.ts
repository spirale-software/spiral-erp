import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFournisseur, Fournisseur } from 'app/shared/model/fournisseur.model';
import { FournisseurService } from './fournisseur.service';
import { FournisseurComponent } from './fournisseur.component';
import { FournisseurDetailComponent } from './fournisseur-detail.component';
import { FournisseurUpdateComponent } from './fournisseur-update.component';

@Injectable({ providedIn: 'root' })
export class FournisseurResolve implements Resolve<IFournisseur> {
  constructor(private service: FournisseurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFournisseur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fournisseur: HttpResponse<Fournisseur>) => {
          if (fournisseur.body) {
            return of(fournisseur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Fournisseur());
  }
}

export const fournisseurRoute: Routes = [
  {
    path: '',
    component: FournisseurComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'spiralErpApp.fournisseur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FournisseurDetailComponent,
    resolve: {
      fournisseur: FournisseurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'spiralErpApp.fournisseur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FournisseurUpdateComponent,
    resolve: {
      fournisseur: FournisseurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'spiralErpApp.fournisseur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FournisseurUpdateComponent,
    resolve: {
      fournisseur: FournisseurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'spiralErpApp.fournisseur.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
