import { HttpErrorResponse } from "@angular/common/http";

export function messageFromError(err : HttpErrorResponse , 
                  myMsg : string = "", 
                  withStatus :boolean = false ,
                   withDetails :boolean = false){
    let message="";
    if (err.error instanceof Error) {
      console.log("Client-side error occured." + JSON.stringify(err));
      message = myMsg;
      } else {
      console.log("Server-side error occured : " + JSON.stringify(err));
      let detailErrMsg = (err.error && err.error.message)?":"+err.error.message:"";
      message = myMsg 
         + (withStatus?" (status="+ err.status + ":" + err.statusText + ") ":"")
         + (withDetails?detailErrMsg:"") ; 
      }
    return message;
  }

  export function cloneObject(obj:any):any{
    return JSON.parse(JSON.stringify(obj));
  }

  export function cloneAnyObjectWithAssign(obj:any):any{
    return Object.assign({},obj);
  }

  export interface SelfClonable<T>{
    clone():T ;
  }

  export function cloneArrayOfSelfClonable<T>(arr:SelfClonable<T>[]):T[]{
    let cArr : T[] = [];
    for(let selfClonableObj of arr){
       cArr.push(selfClonableObj.clone());
    }
    return cArr;
  }

  export function copyObjectProperties(source:object, target : object){
    let arrayOfPropKeys = Reflect.ownKeys(source);
    for(let key of arrayOfPropKeys){
     Reflect.set(target, key, Reflect.get(source,key));
    }
   }

  
