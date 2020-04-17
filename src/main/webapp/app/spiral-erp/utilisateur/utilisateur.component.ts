import { Component } from '@angular/core';

@Component({
  selector: 'erp-utilisateur',
  templateUrl: './utilisateur.component.html'
})
export class UtilisateurComponent {
  utilisateurs: any[];

  constructor() {
    this.utilisateurs = [
      {
        nom: 'Casimir',
        prenom: 'Junior',
        login: 'gyl',
        email: 'gyl@spiral.be',
        telephone: '04555555',
        actif: true,
        entreprise: 'Spiral-ERP'
      },
      {
        nom: 'Ashanti',
        prenom: 'reine',
        login: 'arn',
        email: 'arn@spiral.be',
        telephone: '04555555',
        actif: true,
        entreprise: 'Spiral-MEDIA'
      },
      { nom: 'Toure', prenom: 'Daomey', login: 'tdy', email: 'tdy@spiral.be', telephone: '04555555', actif: true, entreprise: 'Spiral-ERP' }
    ];
  }
}
