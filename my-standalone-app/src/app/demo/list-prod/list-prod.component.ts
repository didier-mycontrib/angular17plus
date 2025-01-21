import { Component, OnInit } from '@angular/core';
import { ProduitService, ProduitV2 } from '../../common/service/produit.service';


@Component({
  selector: 'app-list-prod',
  templateUrl: './list-prod.component.html',
  styleUrls: ['./list-prod.component.scss']
})
export class ListProdComponent implements OnInit {

  listeProduits : ProduitV2[]= [];

  constructor(private _produitService : ProduitService) { 
    //injection de dépendance par constructeur
    this._produitService.seuilMaxiObservable
        .subscribe(
          (seuilQuiVientChanger => 
            this.actualiserListeProduitSelonSeuilMaxi(seuilQuiVientChanger)))
  }

  actualiserListeProduitSelonSeuilMaxi(seuilMaxi : number){
    this._produitService.rechercherProduitSimu$(seuilMaxi)
        .subscribe((listP : ProduitV2[])=> { this.listeProduits = listP})
  
  }      

  ngOnInit(): void {
  }

}
