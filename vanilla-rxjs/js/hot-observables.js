window.onload=()=>{

    subscription_for_viewer=(viewerId,obs$,delay,subscription_timeout)=>{
        setTimeout(_ =>{
            const subscription = obs$.subscribe(
                (v)=> { 
                    let msg = viewerId+": "+v;
                    console.log(msg);
                    document.getElementById(viewerId).innerHTML=v;
                }
            );
            
            setTimeout(_ => {
                subscription.unsubscribe();
            }, subscription_timeout);
        } , delay);
    }

    document.getElementById("btnEx").addEventListener("click" , ()=>{
        document.getElementById("spanLastProduced").innerHTML="";
        document.getElementById("viewer2").innerHTML="";
        document.getElementById("viewer3").innerHTML="";
        document.getElementById("viewer1").innerHTML="";
       
        const coldObs$ = new rxjs.Observable((observer) => {
            //initialize producer:
            let currentNumber = 1;
            const producer = setInterval(_ => {
                document.getElementById("spanLastProduced").innerHTML=currentNumber;
                observer.next(currentNumber++);
            }, 1000);
        
            //returning function that will be called when unsubscribe:
            return () => {
                console.log("end of subscription");
                clearInterval(producer);
            }
        });
      
        //build hot observable from cold
        let hotObs$ = coldObs$.pipe(rxjs.share());

        let coldOrHot =document.getElementById("selectColdOrHot").value;
        let obs$=(coldOrHot=="hot")?hotObs$:coldObs$;

        subscription_for_viewer("viewer1",obs$,0,7000);
        subscription_for_viewer("viewer2",obs$,2000,7000);
        subscription_for_viewer("viewer3",obs$,4000,7000);
        

    });
}