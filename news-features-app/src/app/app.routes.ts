import { Routes } from '@angular/router';
import { WithCodeFlowComponent } from './with-code-flow/with-code-flow.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WithDeferComponent } from './with-defer/with-defer.component';
import { WithSignalComponent } from './with-signal/with-signal.component';

export const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: '', redirectTo: '/welcome', pathMatch: 'full'},
    { path: 'withCodeFlow', component: WithCodeFlowComponent } ,
    { path: 'withDefer', component: WithDeferComponent } ,
    { path: 'withSignal', component: WithSignalComponent } ,
];
