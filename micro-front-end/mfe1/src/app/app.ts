import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CalculatriceComponent } from './calculatrice/calculatrice.component';
import { TvaComponent } from './tva/tva.component';
import { Mfe1Component } from './mfe1/mfe1.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,Mfe1Component],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('micro-front-end-1');
}
