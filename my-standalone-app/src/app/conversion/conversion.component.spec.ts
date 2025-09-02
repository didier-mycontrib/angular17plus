import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { setValueInInput, setValueInSelect } from '../shared/util/test-util';

import { ConversionComponent } from './conversion.component';
import { Devise } from '../common/data/devise';
import { ActivatedRoute } from '@angular/router';
import { DeviseService } from '../common/service/devise-rest.service';

describe('ConversionComponent', () => {
  let component: ConversionComponent;
  let fixture: ComponentFixture<ConversionComponent>;

  //subs of services:
  const deviseServiceStub  = {
    convertir$(montant: number, codeDeviseSrc: string, codeDeviseTarget: string ): Observable<number> {
        if(montant==200 && codeDeviseSrc == "EUR" && codeDeviseTarget=="USD") return of( 217.5 );
        else return of(0)
      }
  }

  const activatedRouteStub = {
              data : of({
                 devises : [
                  new Devise("EUR","Euro",1),
                  new Devise("USD","Dollar",1.1),
                  new Devise("GBP","Livre",0.9),
                  new Devise("JPY","Yen",120)
                ]})
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversionComponent],
      providers:[ {provide : ActivatedRoute , useValue: activatedRouteStub},
                  {provide : DeviseService , useValue: deviseServiceStub}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('convertir(200 EUR en USD donne 217.5', () => {
    const compNativeElt = fixture.debugElement.nativeElement;
    setValueInInput(compNativeElt,"input[name='montant']","200")
    setValueInSelect(compNativeElt,"select[name='selCodeDeviseSource']","EUR")
    setValueInSelect(compNativeElt,"select[name='selCodeDeviseCible']","USD")

      let btnConvertirElt =compNativeElt.querySelector("#btnConvertir");
      btnConvertirElt.click();
      
      fixture.detectChanges();

      const spanMontantConvertiElt = compNativeElt.querySelector('#spanMontantConverti');
      const sMontantConverti = spanMontantConvertiElt.innerText
      console.log("from IHM, montantConverti:" + sMontantConverti);
      //expect(sMontantConverti).toContain('217.5');
      expect(Number(sMontantConverti)).toBeCloseTo(217.5,2)

  });


});


//ng test --include=**/conversion.component.spec.ts