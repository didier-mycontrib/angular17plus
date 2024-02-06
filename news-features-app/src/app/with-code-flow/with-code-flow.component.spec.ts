import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithCodeFlowComponent } from './with-code-flow.component';

describe('WithCodeFlowComponent', () => {
  let component: WithCodeFlowComponent;
  let fixture: ComponentFixture<WithCodeFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithCodeFlowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithCodeFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
