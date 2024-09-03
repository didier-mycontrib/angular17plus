window.onload=()=>{

    let productsArray = [
        { num : 1 , label : "usb key" , price : 12.5 } ,
        { num : 4 , label : "screen" , price : 250 } ,
        { num : 2 , label : "mouse" , price : 8.80 } ,
        { num : 3 , label : "printer" , price : 180 } ];
       

    
    document.getElementById("btnExPipeline").addEventListener("click" , ()=>{
        let maxPrice = document.getElementById("maxPriceInput").value;
        let filterBy = document.getElementById("selectFilter").value;
        let compareFunction ;
        switch(filterBy){
            case "label": 
                 compareFunction = (p1,p2) => p1?p1.label.localeCompare(p2.label):0  ;
            break;
            case "price": 
                 compareFunction = (p1,p2) => p1.price -p2.price;
            break;
            case "num":
            default:
                compareFunction = (p1,p2) => p1.num -p2.num;

        }
        rxjs.of(productsArray)
        .pipe( 
            rxjs.switchMap(p=>p),
            rxjs.filter( p => p.price <= maxPrice),
            rxjs.toArray(),
            rxjs.map(sArray => sArray.sort(compareFunction))
        )
        .subscribe(outputArray => { console.log(JSON.stringify(outputArray)); 
                    let msg = JSON.stringify(outputArray); 
                    document.getElementById("spanResExPipeline").innerHTML=msg;}) ;
       
    });
    
    
}