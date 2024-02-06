import { Component, Signal, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-with-signal',
  standalone: true,
  imports: [],
  templateUrl: './with-signal.component.html',
  styleUrl: './with-signal.component.scss'
})
export class WithSignalComponent {
  message="";

  //sCount=signal<number>(0);
  sCount = signal(0);//new WritableSignal With initial value to 0 
  //other possible signal types : String, boolean , object , array , ...

  //NB: computed() function (of @angular/core) define a new comptuded Signal
  //wich depends of other(s) signal(s)
  sSquare /* :Signal<Number> */ = computed(() => this.sCount() * this.sCount());
  sCountColor /* :Signal<String> */= computed(() => this.sCount()>=0?'green':'red');

  //NB: effect() function (of @angular/core) register a callback
  //that will be automatic called when a signal value change
  //NB: a effect can make a api_call but should not change a other signal .
  logsCountEffect = effect(()=>{ this.message ="sCount="+this.sCount(); console.log(this.message);});

  public onIncrement(){
    //NB: signalName as function call to get value ,
    //   .set() to update/change value with synchronization
    this.sCount.set(this.sCount() + 1);
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