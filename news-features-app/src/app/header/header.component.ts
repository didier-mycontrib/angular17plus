import { Component } from '@angular/core';
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
  //NB: imports: [RouterLink] is required if this component is in a standalone module

  constructor(public mySharedService: MySharedService){
    //dependency injection
  }
}
