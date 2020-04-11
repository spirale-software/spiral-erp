import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'entreprise',
        loadChildren: () => import('./entreprise/entreprise.module').then(m => m.SpiralErpEntrepriseModule)
      },
      {
        path: 'article',
        loadChildren: () => import('./article/article.module').then(m => m.SpiralErpArticleModule)
      },
      {
        path: 'audit',
        loadChildren: () => import('./audit/audit.module').then(m => m.SpiralErpAuditModule)
      },
      {
        path: 'fournisseur',
        loadChildren: () => import('./fournisseur/fournisseur.module').then(m => m.SpiralErpFournisseurModule)
      },
      {
        path: 'achat',
        loadChildren: () => import('./achat/achat.module').then(m => m.SpiralErpAchatModule)
      },
      {
        path: 'utilisateur',
        loadChildren: () => import('./utilisateur/utilisateur.module').then(m => m.SpiralErpUtilisateurModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SpiralErpEntityModule {}
