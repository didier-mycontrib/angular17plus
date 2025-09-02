import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emprunt-v1',
  imports: [FormsModule],
  templateUrl: './emprunt-v1.component.html',
  styleUrl: './emprunt-v1.component.scss'
})
export class EmpruntV1Component {
      montant = 10000.0 //capital emprunté
      tauxInteretAnnuelPct = 2.0 //2% par an
      nbMois = 12*4 ; //4ans
      nbAnnees : number|null = 4 ; 
      nbAnneesPossibles = [ 0,1,2,3,4,5,6,7,8,9,10,12,15,20,25]

      mensualite=0; //à calculer

      constructor(){
        this.onCalculerMensualite();
      }

      onCalculerMensualite(){
        const tauxInteret = (Number(this.tauxInteretAnnuelPct)/12) / 100;
        if(tauxInteret!=0)
            this.mensualite = Number(this.montant) * tauxInteret / ( 1 - Math.pow(1+tauxInteret,- Number(this.nbMois))) 
        else 
            this.mensualite = Number(this.montant) / Number(this.nbMois)
      }

      onChangeNbAnnees(){
        if(this.nbAnnees)
            this.nbMois=this.nbAnnees*12
      }

      onNbMois(){
        this.nbAnnees = this.nbMois / 12
      }
}
