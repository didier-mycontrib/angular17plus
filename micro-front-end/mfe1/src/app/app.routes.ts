import { Routes } from '@angular/router';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { TvaComponent } from './tva/tva.component';
import { Mfe1Component } from './mfe1/mfe1.component';

export const routes: Routes = [
  
    { path: "" , component: Mfe1Component , children:
        [
             { path: "calculatrice" , component: CalculatriceComponent},
             { path: "tva" , component: TvaComponent},
             { path: "" , redirectTo : "calculatrice" , pathMatch: "prefix"},
        ]
    },
];
