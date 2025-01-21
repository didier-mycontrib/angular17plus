import { Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo/demo.component';
import { LoginOutComponent } from './login-out/login-out.component';
import { TvaComponent } from './basic/tva/tva.component';
import { CalculatriceComponent } from './basic/calculatrice/calculatrice.component';
import { WithAnimationsComponent } from './with-animations/with-animations.component';
import { DeviseComponent } from './devise/devise.component';
import { ProductComponent } from './product/product.component';
import { ConversionComponent } from './conversion/conversion.component';
import { devisesResolver } from './common/resolver/devises.resolver';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { authGuard } from './common/guard/auth.guard';

export const routes: Routes = [  
    { path: 'ngr-home', component: HomeComponent },
    { path: 'ngr-login-out', component: LoginOutComponent },
    { path: 'ngr-not-authorized', component: NotAuthorizedComponent },
    { path: 'ngr-basic', component: BasicComponent ,
        children: [
            { path: 'tva', component: TvaComponent },
            { path: 'calculatrice/:mode', component: CalculatriceComponent }, //with required parameter mode
            { path: 'calculatrice', component: CalculatriceComponent },//without  parameter
            { path: '', redirectTo: 'tva', pathMatch: 'full'}
            ]
    },
    { path: 'ngr-devise', component: DeviseComponent ,
         canActivate : [ authGuard ]
    },
    { path: 'ngr-conversion', component: ConversionComponent ,
        resolve : { devises : devisesResolver}
    },
    { path: 'ngr-product', component: ProductComponent },
    { path: 'ngr-demo', component: DemoComponent },
    { path: 'ngr-with-animations', component: WithAnimationsComponent },
    { path: '', redirectTo: '/ngr-home', pathMatch: 'full'},
    { path: '**', redirectTo: '/ngr-home', pathMatch: 'full'}
];
