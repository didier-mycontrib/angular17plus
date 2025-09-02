export function setValueInInput(compNativeElt:any,cssSelector:string,sVal:string){
      let montantInputElt = compNativeElt.querySelector(cssSelector);
      montantInputElt.value=sVal;
      montantInputElt.dispatchEvent(new Event('input'));
}

export function setValueInSelect(compNativeElt:any,cssSelector:string,sVal:string){
      let montantInputElt = compNativeElt.querySelector(cssSelector);
      montantInputElt.value=sVal;
      montantInputElt.dispatchEvent(new Event('change'));
}