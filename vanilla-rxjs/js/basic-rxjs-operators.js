dualDisplay=(eltId,message)=>{
    console.log(message); 
    document.getElementById(eltId).innerHTML=message;
}

window.onload=()=>{


    document.getElementById("btnExPositiveFiltering").addEventListener("click" , ()=>{
        let msg = "";
        let someValuesArray = [ 12 , -15 , 30 , -8 , 40];
        document.getElementById("spanBeforePositiveFiltering").innerHTML=someValuesArray;
        rxjs.of(... someValuesArray)
        .pipe( 
            rxjs.filter(v => v >= 0)
        )
        .subscribe({
            next :   x => { msg += (' ' + x); } ,
            error : e => console.log(e) ,
            complete : () => dualDisplay("spanAfterPositiveFiltering",msg)
        });
    });

    document.getElementById("btnExEvenFiltering").addEventListener("click" , ()=>{
        let msg = "";
        let someValuesArray= [];
        rxjs.range(1,8).subscribe( v => someValuesArray.push(v));
        document.getElementById("spanBeforeEvenFiltering").innerHTML=someValuesArray;
        rxjs.of(... someValuesArray)
        .pipe( 
            rxjs.filter(v => v % 2 === 0)
        )
        .subscribe({
            next :   x => { msg += (' ' + x); } ,
            error : e => console.log(e) ,
            complete : () => dualDisplay("spanAfterEvenFiltering",msg)
        });
       
    });

    document.getElementById("btnExMapToSquare").addEventListener("click" , ()=>{
        let msg = "";
        let someValuesArray= [];
        rxjs.range(1,8).subscribe( v => someValuesArray.push(v));
        document.getElementById("spanBeforeMapToSquare").innerHTML=someValuesArray;
        rxjs.of(... someValuesArray)
        .pipe( 
            rxjs.map(v => v * v)
        )
        .subscribe({
            next :   x => { msg += (' ' + x); } ,
            error : e => console.log(e) ,
            complete : () => dualDisplay("spanAfterMapToSquare",msg)
        });
    });

    document.getElementById("btnExMapToUpperCase").addEventListener("click" , ()=>{
        let msg = "";
        let someStringsArray= ["hello" , "happyness" , "joy"];
        document.getElementById("spanBeforeMapToUpperCase").innerHTML=someStringsArray;
        rxjs.of(... someStringsArray)
        .pipe( 
            rxjs.map(s => s.toUpperCase())
        )
        .subscribe({
            next :   x => { msg += (' ' + x); } ,
            error : e => console.log(e) ,
            complete : () => dualDisplay("spanAfterMapToUpperCase",msg)
        });
    });

    document.getElementById("btnExMapSortingArray").addEventListener("click" , ()=>{
        let msg = "";
        let someStringsArray= ["laurence" , "didier" , "isabelle" , "jonathan"];
        document.getElementById("spanBeforeMapSortingArray").innerHTML=someStringsArray;
        rxjs.of(someStringsArray)
        .pipe( 
            rxjs.map(sArray => sArray.sort())
        )
        .subscribe({
            next :   x => { msg += (' ' + x); } ,
            error : e => console.log(e) ,
            complete : () => dualDisplay("spanAfterMapSortingArray",msg)
        });
    });
    
    
}