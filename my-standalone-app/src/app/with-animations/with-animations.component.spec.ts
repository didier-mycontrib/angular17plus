import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithAnimationsComponent } from './with-animations.component';

describe('WithAnimationsComponent', () => {
  let component: WithAnimationsComponent;
  let fixture: ComponentFixture<WithAnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithAnimationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
