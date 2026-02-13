import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaComponent } from './tva.component';

describe('TvaComponent', () => {
  let component: TvaComponent;
  let fixture: ComponentFixture<TvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
