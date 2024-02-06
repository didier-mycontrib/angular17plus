import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-with-code-flow',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './with-code-flow.component.html',
  styleUrl: './with-code-flow.component.scss'
})
export class WithCodeFlowComponent {
  values=[1,2,3,4];
  withDetails=false;
  detailLevel="none";

  toggleValues(){
    if(this.values.length==0){
      this.values=[1,2,3,4];
    }else{
      this.values=[];
    }
  }
}
