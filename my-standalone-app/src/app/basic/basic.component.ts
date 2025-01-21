import { Component } from '@angular/core';
import { MyTogglePanelComponent } from "../shared/component/generic/my-toggle-panel/my-toggle-panel.component";
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { TvaComponent } from './tva/tva.component';
import { MyImportMaterialModule } from '../shared/imports/my-import-material.module';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-basic',
  imports: [MyTogglePanelComponent,CalculatriceComponent,TvaComponent,
           MyImportMaterialModule,RouterOutlet,RouterLink
  ],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss'
})
export class BasicComponent {

}
