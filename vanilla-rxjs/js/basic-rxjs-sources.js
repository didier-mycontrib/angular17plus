dualDisplay=(eltId,message)=>{
    console.log(message); 
    document.getElementById(eltId).innerHTML=message;
}

window.onload=()=>{

    document.getElementById("btnExRange").addEventListener("click" , ()=>{
        let msg = "";
        rxjs.range(1, 10).subscribe({
            next :   x => { msg += (' ' + x); } ,
            error : e => console.log(e) ,
            complete : () => dualDisplay("spanRange",msg)
        });
    });

    document.getElementById("btnExOfArray").addEventListener("click" , ()=>{
        let msg = "";
        let daysOfWeekArray = [ 'monday' , 'tuesday' , 'wednesday' , 'thursday' , 'friday' , 'saturday' , 'sunday'];
        rxjs.of(daysOfWeekArray).subscribe({
            next :   x => { msg += (' ' + x); } ,
            error : e => console.log(e) ,
            complete : () => dualDisplay("spanOfArray",msg)
        });
    });

    document.getElementById("btnExOfArrayItems").addEventListener("click" , ()=>{
        let msg = "";
        let daysOfWeekArray = [ 'monday' , 'tuesday' , 'wednesday' , 'thursday' , 'friday' , 'saturday' , 'sunday'];
        rxjs.of(... daysOfWeekArray).subscribe({
            next :   x => { msg += (' ' + x); } ,
            error : e => console.log(e) ,
            complete : () => dualDisplay("spanOfArrayItems",msg)
        });
    });

    document.getElementById("btnExAjax").addEventListener("click" , ()=>{
        let wsUrl = "https://catfact.ninja/fact"
        rxjs.ajax.ajax(wsUrl).pipe(
            rxjs.map((rxjsAjaxResp)=> "status=" + rxjsAjaxResp.status + " jsonData=" + JSON.stringify(rxjsAjaxResp.response))
        )
        .subscribe( message => dualDisplay("spanResAjax",message)) ;
    });

    let mouseEventSubscription = null;

    document.getElementById("btnSubscribeFromEvent").addEventListener("click" , ()=>{
        const elDivA = document.getElementById('divA');
        var rectDivA = elDivA.getBoundingClientRect();
        // Create an Observable that will publish mouse movements
        const mouseMoves$ = rxjs.fromEvent(elDivA, 'mousemove');
        // Subscribe to start listening for mouse-move events
        mouseEventSubscription = mouseMoves$.subscribe((evt /*: MouseEvent */) => {
            // Log coords of mouse movements
            let msg=`x=${evt.clientX - rectDivA.left} y=${evt.clientY - rectDivA.top}`;
            console.log(msg);
            document.getElementById("spanResFromEvent").innerHTML=msg;
        });
       
    });

    document.getElementById("btnUnsubscribeFromEvent").addEventListener("click" , ()=>{
        if(mouseEventSubscription!=null){
             mouseEventSubscription.unsubscribe();
             document.getElementById("spanResFromEvent").innerHTML="";
             mouseEventSubscription=null;
        }
    });

    
    
}