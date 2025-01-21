import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';
import { Devise } from '../common/data/devise';
import { DeviseService } from '../common/service/devise-rest.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-conversion',
  imports: [FormsModule,AsyncPipe],
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.scss'
})
export class ConversionComponent {
  montant: number = 0;
  codeDeviseSource: string = "?";
  codeDeviseCible: string = "?";
  //montantConverti: number = 0;
  montantConvertiObs$!: Observable<number>;
  listeDevises: Devise[] = []; //à choisir dans liste déroulante.

  constructor(private route: ActivatedRoute,
    private _deviseService: DeviseService) {
    console.log("ConversionComponent")
    this.route.data.subscribe(
      (data: Data) =>{ 
        let tabDevises = data['devises'];
        if(tabDevises)
           this.initListeDevises(data['devises']); }
    );
  }

  

  onConvertir() {
    console.log("debut de onConvertir")

    this.montantConvertiObs$ = this._deviseService.convertir$(this.montant,
      this.codeDeviseSource,
      this.codeDeviseCible);
  }

  initListeDevises(tabDevises: Devise[]) {
    this.listeDevises = tabDevises;
    if (tabDevises && tabDevises.length > 0) {
      this.codeDeviseSource = tabDevises[0].code; //valeur par défaut
      this.codeDeviseCible = tabDevises[0].code; //valeur par défaut
    }
  }


  ngOnInit(): void {
    //besoin de chercher les devises que si pas de Resolver
    if(this.listeDevises.length==0)
      this._deviseService.getAllObjects$()
      .subscribe({
        next: (tabDev: Devise[]) => { this.initListeDevises(tabDev); },
        error: (err) => { console.log("error:" + err) }
      });
  }
}
