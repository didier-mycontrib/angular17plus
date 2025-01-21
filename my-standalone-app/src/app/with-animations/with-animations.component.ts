import { Component, signal } from '@angular/core';
import { MyImportMaterialModule } from '../shared/imports/my-import-material.module';
import { FormsModule } from '@angular/forms';
import { changeDivSizeTrigger } from '../shared/animations/changeDivSizeTrigger';
import { enterLeaveTrigger } from '../shared/animations/enterLeaveTrigger';
import { fadeInOutTrigger } from '../shared/animations/fadeInOutTrigger';
import { shakeTrigger } from '../shared/animations/shakeTrigger';


@Component({
  selector: 'app-with-animations',
  imports: [MyImportMaterialModule,FormsModule],
  animations : [changeDivSizeTrigger,enterLeaveTrigger,fadeInOutTrigger,shakeTrigger],
  templateUrl: './with-animations.component.html',
  styleUrl: './with-animations.component.scss'
})
export class WithAnimationsComponent {
  myToggleValue : boolean = false;
  ulOrTable : string ="ul";
  myList : string[] = [ "item1" , "item2"];
  lastItemNumber : number = 2;

  onAddItem(){
     this.lastItemNumber++;
     this.myList.push(`item${this.lastItemNumber}`);
  }

  onRemoveItem(){
    if(this.lastItemNumber>0){
      this.lastItemNumber--;
      this.myList.splice(this.lastItemNumber,1);
    }
  }

  sCounter = signal(0);
  myShakeAnimationState="normal";
  onIncrementCounter(){
    this.sCounter.update( n => n+1);
    this.myShakeAnimationState="animed";
    setTimeout(()=> {  this.myShakeAnimationState="normal";} , 1000)
  }

  constructor() { }

  ngOnInit() {
  }
}
