window.onload=()=>{

    let productsArray = [
        { num : 1 , label : "usb key" , price : 12.5 , category : "computer"} ,
        { num : 2 , label : "mouse" , price : 8.80 , category : "computer"} ,
        { num : 4 , label : "screen" , price : 250 , category : "computer"} ,
        { num : 3 , label : "printer" , price : 180 , category : "computer"} ,
        { num : 5 , label : "t-shirt" , price : 15.7 , category : "clothes"} ,
        { num : 6 , label : "pull" , price : 45.7 , category : "clothes"} 
    ];
       
    
    document.getElementById("btnRefreshCriteria").addEventListener("click" , ()=>{
        let maxPrice = document.getElementById("maxPriceInput").value;
        let minPrice = document.getElementById("minPriceInput").value;
        let category = document.getElementById("selectCategory").value;
        
        const filteredProductsArrayObs$= rxjs.of(... productsArray)
        .pipe( 
            // à compléter en exercice : filtrer selon les différents critères et transformer le tout en un tableau resultat
        );

        filteredProductsArrayObs$.subscribe(outputArray => { 
             // à compléter en exercice: afficher les données en JSON dans viewer1
        });

        filteredProductsArrayObs$.subscribe(outputArray => { 
            // à compléter en exercice : afficher le nombre d'éléménts du tableau dans viewer2
        });
        
    });
    
    
}