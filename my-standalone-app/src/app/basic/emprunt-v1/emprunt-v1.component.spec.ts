import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntV1Component } from './emprunt-v1.component';
import { setValueInInput, setValueInSelect } from '../../shared/util/test-util';

describe('EmpruntV1Component', () => {
  let component: EmpruntV1Component;
  let fixture: ComponentFixture<EmpruntV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpruntV1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpruntV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('mensualite(montant=15000,taux=2.5,nbMois=60)==266.21 environ from model', () => {
      component.montant=15000;
      component.tauxInteretAnnuelPct=2.5;
      component.nbMois=60;
      component.onCalculerMensualite();//à ne pas oublier d'appeler si pas de dispatchEvent
      fixture.detectChanges();
      const compNativeElt = fixture.debugElement.nativeElement;
      const spanMensualiteElt = compNativeElt.querySelector('#spanMensualite');
      const sMensualite = spanMensualiteElt.innerText
      console.log("from model, mensualite:" + sMensualite);
      expect(sMensualite).toContain('266.21');
});

it('mensualite(montant=15000,taux=2.5,nbMois=60)==266.21 environ from IHM', () => {
      const compNativeElt = fixture.debugElement.nativeElement;
      /*
      let montantInputElt = compNativeElt.querySelector("input[name='montant']");
      montantInputElt.value="15000";
      montantInputElt.dispatchEvent(new Event('input'));
      */
      setValueInInput(compNativeElt,"input[name='montant']","15000")

      /*
      let tauxInteretAnnuelInputElt = compNativeElt.querySelector("input[name='tauxInteretAnnuel']");
      tauxInteretAnnuelInputElt.value="2.5";
      tauxInteretAnnuelInputElt.dispatchEvent(new Event('input'));
      */
      setValueInInput(compNativeElt,"input[name='tauxInteretAnnuel']","2.5")

      /*
      let nbMoisInputElt = compNativeElt.querySelector("input[name='nbMois']");
      nbMoisInputElt.value="60";
      nbMoisInputElt.dispatchEvent(new Event('input'));
      */
      setValueInInput(compNativeElt,"input[name='nbMois']","60")

      let btnCalculerMensualiteElt =compNativeElt.querySelector("#btnCalculerMensualite");
      //btnCalculerMensualiteElt.dispatchEvent(new Event('click'));
      btnCalculerMensualiteElt.click();
      
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

      let btnCalculerMensualiteElt =compNativeElt.querySelector("#btnCalculerMensualite");
      btnCalculerMensualiteElt.click();
      
      fixture.detectChanges();
      
      const spanMensualiteElt = compNativeElt.querySelector('#spanMensualite');
      const sMensualite = spanMensualiteElt.innerText
      console.log("from IHM, mensualite:" + sMensualite);
      //expect(sMensualite).toContain('266.21'); //à adapter si affichage ajusté via éventuel pipe 
      expect(Number(sMensualite)).toBeCloseTo(266.21,2)
});

  
});



//ng test --include=**/emprunt-v1.component.spec.ts
