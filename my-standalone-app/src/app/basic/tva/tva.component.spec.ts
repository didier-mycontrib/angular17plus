import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaComponent } from './tva.component';
import { NgFor, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToFixedPipe } from '../../common/pipe/to-fixed.pipe';

describe('TvaComponent', () => {
  let component: TvaComponent;
  let fixture: ComponentFixture<TvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvaComponent,FormsModule, NgFor , DecimalPipe , ToFixedPipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

//à lancer via 
// ng test  --include=**/tva.component.spec.ts