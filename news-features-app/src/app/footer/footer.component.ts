import { Component, inject , Output } from '@angular/core';
import { MySharedService } from '../common/service/my-shared.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
 
  /*
  constructor(public mySharedService: MySharedService){
    //dependency injection with constructor
  }
  */

  //better dependency injection (in case of inheritance or if used in function)
  public mySharedService = inject(MySharedService);

  backColorChangeEvent = Output("?"); //as @Output but with output signal
 
  public onChangeSBackColor(event: Event){
      const input = event.target as HTMLInputElement;
      this.mySharedService.sBackColor.set(input.value);

      this.backColorChangeEvent.emit(input.value);
  }
  
}


