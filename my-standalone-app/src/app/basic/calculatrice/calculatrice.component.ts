import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Params } from '@angular/router';


@Component({
selector: 'app-calculatrice',
standalone:true,
imports:[FormsModule , NgFor , NgIf] ,
templateUrl: './calculatrice.component.html',
styleUrls: ['./calculatrice.component.scss']
})
export class CalculatriceComponent {

modeChoisi = "simple" ; //ou "sophistiquee"

constructor(route : ActivatedRoute) {
    route.params.subscribe(
    (params:Params)=>{
       //NB: { path: 'calculatrice/:mode', ... },
       this.modeChoisi = params['mode'];
    }) ;
}

a : number = 0;
b : number = 0;
res : number = 0;
montrerHisto : boolean = true;
historiqueCalculs :string[] = [];
onCalculer(op:string){
switch(op){
case "+" :
this.res = Number(this.a) + Number(this.b); break;
case "-" :
this.res = Number(this.a)- Number(this.b); break;
case "*" :
this.res = Number(this.a) * Number(this.b); break;
default:
this.res = 0;
}
this.historiqueCalculs.push(`${this.a} ${op} ${this.b} = ${this.res}`)
}

//coordonnées relatives de la souris qui survole une div
x:number=0;
y:number=0;
onMouseMove(evt : MouseEvent){
let currentDiv : HTMLElement = <HTMLElement> evt.target;
this.x = evt.pageX - currentDiv.offsetLeft;
this.y = evt.pageY - currentDiv.offsetTop;
}
onMouseLeave(evt : MouseEvent){
this.x=0; this.y=0;
}

}
