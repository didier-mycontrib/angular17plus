import { DecimalPipe, NgFor } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToFixedPipe } from '../../common/pipe/to-fixed.pipe';

@Component({
  selector: 'app-tva',
  imports: [FormsModule, NgFor , DecimalPipe , ToFixedPipe],
  templateUrl: './tva.component.html',
  styleUrl: './tva.component.scss'
})
export class TvaComponent {

  tauxPossibles = [ 5.0 , 10.0 , 20.0];

  //version avec signaux et avec [(ngModel)]:

  sHt  = signal(0);
  sTaux  = signal(20); //taux en % (20% par defaut)

  sTva = computed( () => this.sHt() * this.sTaux() / 100);
  sTtc = computed (()=> this.sHt() + this.sTva() );

}



/*
version sans signal:
--------------------
export class TvaComponent {

  tauxPossibles = [ 5.0 , 10.0 , 20.0];

  ht  = 0;
  taux   = 0; //taux en %

  onCalculerTvaEtTtc(){
    this.tva = this.ht * this.taux / 100; 
    this.ttc = this.ht + this.tva;
  }

  tva = 0;
  ttc   = 0;

}
*/

/*
   //version avec signaux et sans [(ngModel)]

   sHt  = signal(0);
  sTaux  = signal(20); //taux en % (20% par defaut)

  sTva = computed( () => this.sHt() * this.sTaux() / 100);
  sTtc = computed (()=> this.sHt() + this.sTva() );

  onActualiserHt(evt : Event){
    let zoneHt : HTMLInputElement = <HTMLInputElement> evt.target;
    let vHt = zoneHt.value;
    console.log("ht="+vHt);
    this.sHt.set(Number(vHt));
  }

  onActualiserTaux(evt : Event){
    let zoneTaux : HTMLSelectElement  = <HTMLSelectElement> evt.target;
    let vTaux = zoneTaux.value;
    console.log("taux="+vTaux);
    this.sTaux.set(Number(vTaux));
  }
*/