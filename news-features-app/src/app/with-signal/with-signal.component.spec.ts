import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithSignalComponent } from './with-signal.component';

describe('WithSignalComponent', () => {
  let component: WithSignalComponent;
  let fixture: ComponentFixture<WithSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithSignalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
