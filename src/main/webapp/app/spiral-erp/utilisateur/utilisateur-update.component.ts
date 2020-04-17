import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { UtilisateurService } from 'app/entities/utilisateur/utilisateur.service';
import { UtilisateurErpService } from 'app/spiral-erp/utilisateur/utilisateur-erp.service';

@Component({
  selector: 'erp-utilisateur-update',
  templateUrl: './utilisateur-update.component.html'
})
export class UtilisateurUpdateComponent implements OnInit {
  titre: string | undefined;

  constructor(private route: ActivatedRoute, private utilisateurErpService: UtilisateurErpService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.titre = 'Détail/Modification utilisateur';
    } else {
      this.titre = 'Créer une nouvel utilisateur';
    }
  }

  back(): void {
    window.history.back();
  }
}
