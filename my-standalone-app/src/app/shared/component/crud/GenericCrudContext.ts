import { filter, Observable, of, switchMap, tap, throwError, toArray } from 'rxjs';
import { GenericCrudAbstractContextHelper } from './abstract/GenericCrudAbstractContextHelper';
import { GenericCrudService } from '../../service/generic-crud-service';
import { FilterDef } from '../../data/filter-def';

export class GenericCrudContext<T,I>{

    public entityTypeName : string="UnknownEntityName"; //ex: "Devise" ou "Contact" ou ...
    
    constructor(public contextHelper : GenericCrudAbstractContextHelper<T,I> ){
        this.entityTypeName = contextHelper.objectHelper().getEntityTypeName();
    } 

    //filters list to define (when configuring GenericCrudContext)
    public filterDefs : FilterDef[] = [];

    public tabObjects : T[]=[];

    public onGetAllObjects$(genericCrudService : GenericCrudService<T> | null) : Observable<T[]>{
        let crudHelper = this.contextHelper.crudHelper();
        if(crudHelper!=null)
            return crudHelper.onGetAllObjects$();
        else if(genericCrudService)
           return   genericCrudService.getAllObjects$(null);
           //<Observable<T[]>> <any> = temporal workaround for unknown angular library version mismatch (rxjs from d2f-ngx-commons) when npm link (no problem with npm i -s d2f-ngx-commons)
        else return throwError(()=>{err:"onGetAllObjects$ not implemented (no genericCrudService and no crudHelper)"});
    }

    public onFindObjectsByCriteria$(criteria : string , genericCrudService : GenericCrudService<T> | null) : Observable<T[]>{
        let crudHelper = this.contextHelper.crudHelper();
        if(crudHelper!=null)
            return crudHelper.onFindObjectsByCriteria$(criteria);
        else if(genericCrudService)
           return   genericCrudService.findObjectsFromCriteria$(criteria,null);
           //<Observable<T[]>> <any> = temporal workaround for unknown angular library version mismatch (rxjs from d2f-ngx-commons) when npm link (no problem with npm i -s d2f-ngx-commons)
        else return throwError(()=>{err:"onFindObjectsByCriteria$ not implemented (no genericCrudService and no crudHelper)"});
    }

    public onFindObjectsWithFilterDefs$(genericCrudService : GenericCrudService<T> | null) : Observable<T[]>{
        let allServerSideFilters = "";
        let clientSideFilters = [];
        for(let fd of this.filterDefs){
            let csf = fd.sumUpClientSide();
            let ssf = fd.sumUpServerSide();
            if(ssf!=""){
                if(allServerSideFilters=="") allServerSideFilters=ssf;
                else allServerSideFilters+=("&"+ssf);
            }
            if(csf!=""){
                clientSideFilters.push(fd);
            }
        }
        
        let serverSideResults : Observable<T[]>= 
           this.onFindObjectsByCriteria$(allServerSideFilters,genericCrudService);

        if(clientSideFilters.length==0)
            return serverSideResults; //without client side filter
        else
           return serverSideResults //with client side filter(s)
           .pipe(
             switchMap(obj=>obj),
             filter(clientSideFilters[0].clientFilterFnWithArg()),
             toArray()
           );
    }

    public onAddObject$(obj:T , genericCrudService : GenericCrudService<T> | null) : Observable<T>{
        let crudHelper = this.contextHelper.crudHelper();
        if(crudHelper!=null)
            return crudHelper.onAddObject$(obj);
        else if(genericCrudService)
           return   genericCrudService.postEntityObject$(obj);
        else return throwError(()=>{err:"onAddObject$ not implemented (no genericCrudService and no crudHelper)"});
    }

    public onUpdateObject$(obj:T , genericCrudService : GenericCrudService<T> | null) : Observable<T>{
        let crudHelper = this.contextHelper.crudHelper();
        let id = this.contextHelper.objectHelper().getId(obj);
        if(crudHelper!=null)
            return crudHelper.onUpdateObject$(obj);
        else if(genericCrudService)
           return   genericCrudService.putEntityObject$(id,obj);
        else return throwError(()=>{err:"onUpdateObject$ not implemented (no genericCrudService and no crudHelper)"});
    }

    public onDeleteObject$(id: I , genericCrudService : GenericCrudService<T> | null) : Observable<any>{
        let crudHelper = this.contextHelper.crudHelper();
        if(crudHelper!=null)
            return crudHelper.onDeleteObject$(id);
        else if(genericCrudService)
           return  genericCrudService.deleteEntityObjectServerSide$(id);
        else return throwError(()=>{err:"onDeleteObject$ not implemented (no genericCrudService and no crudHelper)"});
    }

   
}