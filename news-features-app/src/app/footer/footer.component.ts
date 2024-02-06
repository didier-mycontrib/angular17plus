import { Component } from '@angular/core';
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
  constructor(public mySharedService: MySharedService){
    //dependency injection
  }
 
  public onChangeSBackColor(event: Event){
      const input = event.target as HTMLInputElement;
      this.mySharedService.sBackColor.set(input.value)
  }
  
}
