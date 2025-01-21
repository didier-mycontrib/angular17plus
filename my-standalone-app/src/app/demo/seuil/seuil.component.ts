import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../common/service/produit.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-seuil',
  imports: [FormsModule],
  templateUrl: './seuil.component.html',
  styleUrls: ['./seuil.component.scss']
})
export class SeuilComponent  {

  public seuilMax=100; //à saisir

  onSeuilChange(){
    this._produitService.changerSeuil(this.seuilMax);
  }

  constructor(private _produitService : ProduitService) { }


}
