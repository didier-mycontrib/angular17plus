import { TestBed } from '@angular/core/testing';

import { CalculFinanceService } from './calcul-finance.service';

describe('CalculFinanceService', () => {
  let service: CalculFinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculFinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   it('mensualite(montant=15000,tauxAnnuel=2.5,nbMois=60)==266.21 environ', () => {
    const mensualite = service.calculMensualiteConstanteNbMoisTauxAnnuelPct(15000,60,2.5);
    expect(mensualite).toBeCloseTo(266.21)
  });

  it('mensualite(montant=15000,tauxAnnuel=2.5,nbAnnees=5)==266.21 environ', () => {
    const mensualite = service.calculMensualiteConstanteNbAnsTauxAnnuelPct(15000,5,2.5);
    expect(mensualite).toBeCloseTo(266.21)
  });

  it('mensualite(montant=15000,tauxMensuel=2.5/12,nbMois=60)==266.21 environ', () => {
    const mensualite = service.calculMensualiteConstanteNbMoisTauxMensuelPct(15000,60,2.5/12);
    expect(mensualite).toBeCloseTo(266.21)
  });
});

//ng test --include=**/calcul-finance.service.spec.ts
