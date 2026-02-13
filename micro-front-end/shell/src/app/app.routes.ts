import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    { path: "welcome" , component : WelcomeComponent} ,
   { path: 'mfe1',
       loadChildren: () => loadRemoteModule('mfe1', './routes').then((m) => m.routes)
     },
  
   { path: "" , redirectTo: "/welcome" , pathMatch:"full"} 
];

/*

 { path: 'mfe1',
       loadComponent: () => loadRemoteModule('mfe1', './Component').then((m) => m.App)
     },

{ path: 'mfe1',
       loadComponent: () => loadRemoteModule('mfe1', './routes').then((m) => m.routes)
     },
  

*/