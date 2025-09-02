import { Component } from '@angular/core';
import { SimplePopupComponent } from '../../shared/component/generic/simple/simple-popup/simple-popup.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-with-simple-popup',
  imports: [SimplePopupComponent,FormsModule,CommonModule],
  templateUrl: './with-simple-popup.component.html',
  styleUrl: './with-simple-popup.component.scss'
})
export class WithSimplePopupComponent {

  age=0
  basicAgeDialogContext = { age : this.age};

  toBeShown = false;

  showAgePopup() {
	this.toBeShown = true;
  }

  handlePopupResult(ok:boolean) {
    console.log("ok="+ok);
	  this.toBeShown = false;
    if(ok){
      this.age=this.basicAgeDialogContext.age;
    }
  }

}
