import { Component, OnInit , EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-reglette',
  templateUrl: './reglette.component.html',
  styleUrls: ['./reglette.component.scss']
})
export class RegletteComponent  {

  @Input()
  width/*:string*/ = "100"; //largeur paramétrage (100px par defaut)

  @Output()
  changeEvent  = new EventEmitter<{value:number}>();

  onCurseur(event : Event){
       const evt : MouseEvent = <MouseEvent> event;
       const valX = evt.offsetX;
       const pctCurseur = (valX / Number(this.width)) * 100 ; //en %
       this.changeEvent.emit({value:pctCurseur});
  }

  constructor() { }

 

}
