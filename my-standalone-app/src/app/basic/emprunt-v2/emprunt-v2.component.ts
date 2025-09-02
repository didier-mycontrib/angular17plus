import { Component, signal , computed, effect} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emprunt-v2',
  imports: [FormsModule],
  templateUrl: './emprunt-v2.component.html',
  styleUrl: './emprunt-v2.component.scss'
})
export class EmpruntV2Component {
      montant = signal(10000.0) //capital emprunté
      tauxInteretAnnuelPct = signal(2.0) //2% par an
      nbMois = signal(12*4) ; //4ans
      nbAnnees = signal(4) ; 
      nbAnneesPossibles = [ 0,1,2,3,4,5,6,7,8,9,10,12,15,20,25]

      mensualite=computed(()=> this.calculMensualite(this.montant(),this.nbMois(),this.tauxInteretAnnuelPct())); //à calculer
      ajustNbMoisFromNbAnneesEffect = effect( ()=>{
        this.nbMois.set(this.nbAnnees()*12)
      });

      calculMensualite(montant:number,nbMois:number,tauxInteretAnnuelPct:number){
         let mensualite=0;
         const tauxInteret = (tauxInteretAnnuelPct/12) / 100;
         if(tauxInteret!=0)
            mensualite = montant * tauxInteret / ( 1 - Math.pow(1+tauxInteret,- nbMois)) 
         else 
            mensualite = montant / nbMois
        return mensualite
      }

      
}
