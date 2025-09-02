import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntV3Component } from './emprunt-v3.component';
import { setValueInInput, setValueInSelect } from '../../shared/util/test-util';
import { CalculFinanceService } from '../../common/service/calcul-finance.service';

describe('EmpruntV3Component', () => {
  let component: EmpruntV3Component;
  let fixture: ComponentFixture<EmpruntV3Component>;

  //optionnal stub_or_mock of service:
  const calculFinanceServiceStub  = {
    calculMensualiteConstanteNbMoisTauxAnnuelPct(montant:number,nbMois:number,tauxInteretAnnuelPct:number){
         let mensualite=0;
         const tauxInteret = (tauxInteretAnnuelPct/12) / 100;
         if(tauxInteret!=0)
            mensualite = montant * tauxInteret / ( 1 - Math.pow(1+tauxInteret,- nbMois)) 
         else 
            mensualite = montant / nbMois
        return mensualite
      }
  }

  beforeEach(async () => {
    /*
    //Test with default real service "CalculFinanceService"
    await TestBed.configureTestingModule({
      imports: [EmpruntV3Component]
    })
    .compileComponents();
    */

     //Thin layer Unit Test with stub/mock of "CalculFinanceService"
    await TestBed.configureTestingModule({
      imports: [EmpruntV3Component],
      providers:[ {provide : CalculFinanceService , useValue: calculFinanceServiceStub}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpruntV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mensualite(montant=15000,taux=2.5,nbMois=60)==266.21 environ from model', () => {
        component.montant.set(15000);
        component.tauxInteretAnnuelPct.set(2.5);
  
        component.nbMois.set(60);  //ok avec angular 19.0.0 et et 19.2.0
        //NB: la méthode .set() n'est appelable que sur un WritableSignal<T> et pas un Signal<T>
        //du coté ....component.ts soit nbMois = signal(12*4) ,
        //                         soit nbMois : WritableSignal<number> = signal(12*4)
        //                    mais pas nbMois : Signal<number> = signal(12*4)
  
        fixture.detectChanges();
        const compNativeElt = fixture.debugElement.nativeElement;
        const spanMensualiteElt = compNativeElt.querySelector('#spanMensualite');
        const sMensualite = spanMensualiteElt.innerText
        console.log("from model, mensualite:" + sMensualite);
        expect(sMensualite).toContain('266.21');
  });
  
    it('mensualite(montant=15000,taux=2.5,nbMois=60)==266.21 environ from IHM', () => {
        const compNativeElt = fixture.debugElement.nativeElement;
        setValueInInput(compNativeElt,"input[name='montant']","15000")
        setValueInInput(compNativeElt,"input[name='tauxInteretAnnuel']","2.5")
        setValueInInput(compNativeElt,"input[name='nbMois']","60")
  
        fixture.detectChanges();
        
        const spanMensualiteElt = compNativeElt.querySelector('#spanMensualite');
        const sMensualite = spanMensualiteElt.innerText
        console.log("from IHM, mensualite:" + sMensualite);
        //expect(sMensualite).toContain('266.21');
        expect(Number(sMensualite)).toBeCloseTo(266.21,2)
  });
  
  it('mensualite(montant=15000,taux=2.5,select nbAnnees=5)==266.21 environ from IHM', () => {
        const compNativeElt = fixture.debugElement.nativeElement;
        setValueInInput(compNativeElt,"input[name='montant']","15000")
        setValueInInput(compNativeElt,"input[name='tauxInteretAnnuel']","2.5")
        setValueInSelect(compNativeElt,"select[name='selNbAnnees']","5")
  
        fixture.detectChanges();
        
        const spanMensualiteElt = compNativeElt.querySelector('#spanMensualite');
        const sMensualite = spanMensualiteElt.innerText
        console.log("from IHM, mensualite:" + sMensualite);
        //expect(sMensualite).toContain('266.21'); //à adapter si affichage ajusté via éventuel pipe 
        expect(Number(sMensualite)).toBeCloseTo(266.21,2)
  });
});

//ng test --include=**/emprunt-v3.component.spec.ts
