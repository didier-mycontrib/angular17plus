dualDisplay=(eltId,message)=>{
    console.log(message); 
    document.getElementById(eltId).innerHTML=message;
}

window.onload=()=>{


    document.getElementById("btnExHighOrderObs").addEventListener("click" , ()=>{
        let msg = "";
        let wsUrlArray = [ 'https://catfact.ninja/fact' , ' https://geo.api.gouv.fr/communes?codePostal=78000',
            ' https://geo.api.gouv.fr/communes?codePostal=76000' , ' https://geo.api.gouv.fr/communes?codePostal=80000'
         ];

        let mode =document.getElementById("selectMode").value;
        let mapFunction;
        switch(mode){
            case "mergeMap" : mapFunction=rxjs.mergeMap; break;
            case "switchMap" : mapFunction=rxjs.switchMap; break;
            case "exhaustMap" : mapFunction=rxjs.exhaustMap; break;
            case "concatMap" :
                default: mapFunction=rxjs.concatMap; break;
        }

        rxjs.of(... wsUrlArray)
        .pipe(
            //in this pipe : url as Observable<string> : first level of observable things :outer observable
            mapFunction( 
                url => rxjs.ajax.ajax(url)
                //http.get(url) or ajax(url) return a second level of observables things (http responses) : inner observable
            ) ,
            rxjs.map((rxjsAjaxResp)=> "status=" + rxjsAjaxResp.status + " jsonData=" + JSON.stringify(rxjsAjaxResp.response))
        )
        .subscribe({
            next :   x => { msg += (x+'<br/>'); } ,
            error : e => console.log(e) ,
            complete : () => dualDisplay("spanExHighOrderObs",msg)
        });
    });

}

/*
NB: outerObservable.pipe(
       xyzMap(innerObservable),
       ....)
       .subscribe(.... données globalement récupérées   ...);

Variantes:
concatMap(innerObservable)  ---> concaténation après un déclenchement d'une boucle sur le outer_observable et bufferisation
                                   --> ordre contrôlé au sein du résultat global (groupBy sur outer observable)
mergeMap(innerObservable)  ---> fusion avec sous déclenchements en parallèles au fur et à mesure (multiple sous-subscribes simultanés)
                                --> ordre incontrôlé au sein du résultat global
switchMap(innerObservable) --->  sous déclenchements séquentiels  (subscribe , unsubscribe/cancel_new, subscribe, unsubscribe/cancel_new , ...)
                                 --> interruption du traitement du sous niveau courant dès qu'arrive un nouvel élémnet du niveau principal
exhaustMap(innerObservable) ---> comme switchMap mais ignore nouvelle occurrence du niveau principal si le traitement du sous niveau courant n'est pas encore terminé
       */