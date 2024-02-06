import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MySharedService {

  public sBackColor = signal("lightGrey");

  constructor() { 
    console.log("sBackColor="+this.sBackColor())
  }
}
