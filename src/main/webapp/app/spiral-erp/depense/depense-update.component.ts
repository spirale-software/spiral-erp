import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'erp-depense-update',
  templateUrl: './depense-update.component.html'
})
export class DepenseUpdateComponent implements OnInit {
  titre: string | undefined;
  typeOptions: SelectItem[];

  constructor(private route: ActivatedRoute) {
    this.typeOptions = [
      { label: 'ORDINAIRE', value: 'ORDINAIRE' },
      { label: 'EXTRAORDINAIRE', value: 'EXTRAORDINAIRE' }
    ];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.titre = 'Détail/Modification dépense';
    } else {
      this.titre = 'Créer une nouvelle dépense';
    }
  }

  back(): void {
    window.history.back();
  }
}
