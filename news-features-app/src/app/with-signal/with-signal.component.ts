import { Component, Signal, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval} from 'rxjs';
import { toSignal} from '@angular/core/rxjs-interop';
import { AsyncPipe, UpperCasePipe } from '@angular/common';

// Refreshable<T> wrapper for handling immutability of signal value
class Refreshable<T>{
     public timestamp: Date;
     constructor(public value:T){
        this.timestamp=new Date(); //with time 
     }
     time(){
      return this.timestamp.getTime();
     }
     refresh(){
      return new Refreshable<T>(this.value);
     }
}

@Component({
    selector: 'app-with-signal',
    standalone : true,
    imports: [FormsModule, AsyncPipe, UpperCasePipe],
    templateUrl: './with-signal.component.html',
    styleUrl: './with-signal.component.scss'
})
export class WithSignalComponent {
  message="";

  //sCount=signal<number>(0);
  sCount = signal(0);//new WritableSignal<number> With initial value to 0 
  //other possible signal types : String, boolean , object , array , ...

  sRefreshableCount = signal(new Refreshable<number>(0));

  //NB: computed() function (of @angular/core) define a new comptuded Signal
  //wich depends of other(s) signal(s)
  sSquare /* :Signal<Number> */ = computed(() => this.sCount() * this.sCount());
  sCountColor /* :Signal<String> */= computed(() => this.sCount()>=0?'green':'red');

  //NB: effect() function (of @angular/core) register a callback
  //that will be automatic called when a signal value change
  //NB: a effect can make a api_call but should not change a other signal .
  logsCountEffect = effect(()=>{ this.message ="sCount="+this.sCount(); console.log(this.message);});
  
  logsRefreshableCountEffect = effect(()=>{ 
    this.message ="sRefreshableCount="+this.sRefreshableCount().value + " with .timestamp="+ this.sRefreshableCount().time() ; 
    console.log(this.message);}
  );

  public onIncrement(){
    //NB: signalName as function call to get value ,
    //   .set() to update/change value with synchronization
    this.sCount.set(this.sCount() + 1);
  }

  public onRefresh(){
    //signal.update(val) is only useful if val change
    //refreshable wrapper instanstance is changed when .refesh() is call
    //(with a new timestamp) but inner .value may still remain same value 
    this.sRefreshableCount.set(this.sRefreshableCount().refresh());  
  }

  public onDecrement(){
    //.set(newValue)
    //.update(currentValue->newValue)
    //this.sCount.set(this.sCount() - 1);
    this.sCount.update ( count => count-1);
  }

  public onSCountChange(event : Event){
      const input = event.target as HTMLInputElement;
      this.sCount.set(Number(input.value));
  }

  myIntervalObs = interval(1000); //observable emmitting 1,2,3,.. every 1000ms
  myIntervalSignal = toSignal(this.myIntervalObs, { initialValue: 0 } )
  name1="";
  name2AsSignal=signal("");
  name3AsSignal=signal("");

  public onName2Change(evt:Event){
      const newText = (evt.target as HTMLInputElement).value;
      console.log("newText="+newText);
      this.name2AsSignal.set(newText);
  }
}
/*
NB: with signals --> better performances , better automatic/internal change detection 
(Fine grained reactivity = fine grained change detection = performance explosion)
(signal value refresh uses some "pull" mechanisms with intelligent re-computing or not )
=======
Shared signals can be put in services
=================
Signal (angular 16+) vs BehaviorSubject(RxJs)
---------------------
Signals are simpler (with better performance) for simple scenario
Subjects (RxJs) are more powerful (asynchronous, multiple subscribers, ...) for complex use cases
==> no signal but ASYNCHRONOUS observables for http.get() results !!!
*/