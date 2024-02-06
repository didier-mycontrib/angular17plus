import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithDeferComponent } from './with-defer.component';

describe('WithDeferComponent', () => {
  let component: WithDeferComponent;
  let fixture: ComponentFixture<WithDeferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithDeferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithDeferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
