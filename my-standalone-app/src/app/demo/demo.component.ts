import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../common/service/produit.service';
import { ZzComponent } from './zz/zz.component';
import { SeuilComponent } from './seuil/seuil.component';
import { ListProdComponent } from './list-prod/list-prod.component';
import { RegletteComponent } from './reglette/reglette.component';

@Component({
  selector: 'app-demo',
  imports: [ZzComponent , SeuilComponent , ListProdComponent , RegletteComponent],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  valeurCurseur /*:number*/ =0;

  onChangeCurseur(event : any){
    const evt : {value:number} = event;
    this.valeurCurseur = evt.value;
  }

  nbProdPrixInferieurSeuilMaxi /*: number*/ = 0;

  actualiserNbProd(prixMaxi : number){
    this.produitService.rechercherNombreProduitSimu$(prixMaxi)
    .subscribe((nbProd) => { this.nbProdPrixInferieurSeuilMaxi = nbProd;});
  }

  constructor(private produitService  : ProduitService) {
    this.produitService.seuilMaxiObservable.subscribe(
      (nouveauSeuil)=>{ this.actualiserNbProd(nouveauSeuil);}
      );
   }

  ngOnInit(): void {
  }

}
