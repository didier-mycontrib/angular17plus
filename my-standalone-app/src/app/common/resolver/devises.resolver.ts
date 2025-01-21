import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Devise } from '../data/devise';
import { DeviseService } from '../service/devise-rest.service';
import { ResolveFn } from '@angular/router';

//in odler angular version: DevisesResolver implements Resolve<Devise[]>
//as a service with .revolve() returning Observable<Devise[]>

export const devisesResolver: ResolveFn<Devise[]> = 
    (route,  state ): Observable<Devise[]> => {
        const deviseService = inject(DeviseService);
        console.log("preFetch Devises via devisesResolver")
        return deviseService.getAllObjects$();
        //return deviseService.getXyz(route.params['xyz']);
       };