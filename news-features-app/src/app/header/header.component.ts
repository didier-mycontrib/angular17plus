import { Component , inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MySharedService } from '../common/service/my-shared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  titre = input("titre_par_defaut"); //optional inputSignal (better than @Input)
  //NB: imports: [RouterLink] is required if this component is in a standalone module

  /*
  constructor(public mySharedService: MySharedService){
    //dependency injection with constructor
  }
  */

  //better dependency injection (in case of inheritance or if used in function)
  public mySharedService = inject(MySharedService);
}
