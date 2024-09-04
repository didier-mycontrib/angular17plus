//fonction affichant un message à la fois dans la console et à la fois dans une 
//zone de la page (div, span, pre, ....) identifiée par elId
//si isToAppend vaut true alors concaténation à la suite des précédents messages
//exemples d'appels: dualDisplay("pre1","ligne1"); dualDisplay("pre1","ligne2",true);

function dualDisplay(elId,message,isToAppend){
    console.log(message);
    let el = document.getElementById(elId);
    let globalMessage = message;
    if(isToAppend){
        globalMessage=el.innerHTML + "\n" + message;
    }
    el.innerHTML=globalMessage;
}

function dualAppend(elId,message){
    //avec isToAppend= true 
    dualDisplay(elId,message,true);
}

function dualDisplayMessage(message){
    //avec elId= "idMsg" par défaut et sans isToAppend
    dualDisplay("idMsg",message);
}

function dualAppendMessage(message){
    //avec elId= "idMsg" par défaut et avec isToAppend=true
    dualAppend("idMsg",message);
}

function displayFunctionCode(functionName){
    let elPreCode = document.getElementById("idCode");
    let functionCode = "" + functionName + "\n";
    console.log("code of function:" + functionCode);
    elPreCode.innerText=functionCode;
}