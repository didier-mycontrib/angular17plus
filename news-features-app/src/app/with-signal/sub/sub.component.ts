import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sub',
  imports: [FormsModule],
  standalone : true,
  templateUrl: './sub.component.html',
  styleUrl: './sub.component.scss'
})
export class SubComponent {
   public  ic = input(0); //input counter as input signal
   public  oc = output<number>(); //output counter as output signal
   public  mc = model(0); //model (input+output) counter as model signal

   public ocVal=0;
   
   onOcIncr(){
    this.ocVal++;
    this.oc.emit(this.ocVal);
   }
}
