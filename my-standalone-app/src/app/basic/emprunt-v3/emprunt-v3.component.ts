import { Component, computed, effect, inject, signal } from '@angular/core';
import { CalculFinanceService } from '../../common/service/calcul-finance.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-emprunt-v3',
  imports: [FormsModule],
  templateUrl: './emprunt-v3.component.html',
  styleUrl: './emprunt-v3.component.scss'
})
export class EmpruntV3Component {

  calculFinanceService = inject(CalculFinanceService)

  montant = signal(10000.0) //capital emprunté
  tauxInteretAnnuelPct = signal(2.0) //2% par an
  nbMois = signal(12*4) ; //4ans
  nbAnnees = signal(4) ; 
  nbAnneesPossibles = [ 0,1,2,3,4,5,6,7,8,9,10,12,15,20,25]

  mensualite=computed(()=> this.calculFinanceService.calculMensualiteConstanteNbMoisTauxAnnuelPct(
                                   this.montant(),this.nbMois(),this.tauxInteretAnnuelPct())
                      );
                      
  ajustNbMoisFromNbAnneesEffect = effect( ()=>{
      this.nbMois.set(this.nbAnnees()*12)
  });
}
