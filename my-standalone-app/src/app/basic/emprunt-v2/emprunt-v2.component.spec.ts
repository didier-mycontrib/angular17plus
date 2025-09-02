import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpruntV2Component } from './emprunt-v2.component';
import { setValueInInput, setValueInSelect } from '../../shared/util/test-util';

//NB: cet import additionnel est (selon version angular) quelquefois
// nécessaire pour fixer directement la valeur d'un signal depuis une classe de test:
//import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';

describe('EmpruntV2Component', () => {
  let component: EmpruntV2Component;
  let fixture: ComponentFixture<EmpruntV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpruntV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpruntV2Component);
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
      //signalSetFn(<any>component.nbMois[SIGNAL], 60);//ok avec angular 19.0.0 et 19.2.0


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

//ng test --include=**/emprunt-v2.component.spec.ts
