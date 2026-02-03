import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent],
  template: `
    <app-dashboard></app-dashboard>
    <router-outlet />
  `,
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'RiskWall.Client';
}
