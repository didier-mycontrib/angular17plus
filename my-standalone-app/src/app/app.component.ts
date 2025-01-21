import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { MyTogglePanelComponent } from './shared/component/generic/my-toggle-panel/my-toggle-panel.component';
import { D2fNgxLayoutComponent } from './shared/component/layout/d2f-ngx-layout.component';
import { MenuDef } from './shared/data/menu-def';

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet,BasicComponent,MyTogglePanelComponent],
  imports: [D2fNgxLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-standalone-app';

  legalFooterMainText ="this app legal footer"

  appMenuDefs : MenuDef[] = [
    new MenuDef("home","/ngr-home"),
    new MenuDef("public ...",null,[
      new MenuDef("basic","/ngr-basic"),
      new MenuDef("animations","/ngr-with-animations"),
      new MenuDef("demo","/ngr-demo"),
      new MenuDef("conversion","/ngr-conversion")
    ]),
    
    new MenuDef("login-out","/ngr-login-out"),
    
    new MenuDef("admin ...",null,[
      new MenuDef("devises","/ngr-devise"),
      new MenuDef("products","/ngr-product"),
    ])
  ];

  quickMenuDefs : MenuDef[] = [
      new MenuDef("demo","/ngr-demo"),
      new MenuDef("basic","/ngr-basic"),
  ];
}
