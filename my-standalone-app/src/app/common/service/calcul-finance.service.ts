import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculFinanceService {

     calculMensualiteConstanteNbMoisTauxMensuelPct(montant:number,nbMois:number,tauxInteretMensuelPct:number){
         let mensualite=0;
         const tauxInteret = tauxInteretMensuelPct / 100;
         if(tauxInteret!=0)
            mensualite = montant * tauxInteret / ( 1 - Math.pow(1+tauxInteret,- nbMois)) 
         else 
            mensualite = montant / nbMois
        return mensualite
      }

    calculMensualiteConstanteNbAnsTauxAnnuelPct(montant:number,nbAnnees:number,tauxInteretAnnuelPct:number){
      return this.calculMensualiteConstanteNbMoisTauxMensuelPct(montant,nbAnnees*12,tauxInteretAnnuelPct/12)
    }

     calculMensualiteConstanteNbMoisTauxAnnuelPct(montant:number,nbMois:number,tauxInteretAnnuelPct:number){
      return this.calculMensualiteConstanteNbMoisTauxMensuelPct(montant,nbMois,tauxInteretAnnuelPct/12)
    }
}
