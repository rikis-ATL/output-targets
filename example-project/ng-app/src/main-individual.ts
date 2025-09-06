import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { individualRoutes } from './app/individual.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="header">
      <h1>🌳 Tree Shaking Test - Individual Imports</h1>
      <p>This build only imports specific components needed</p>
    </div>
    <router-outlet />
  `,
  styles: [`
    .header {
      background: #e8f5e8;
      padding: 20px;
      text-align: center;
      border-bottom: 2px solid #28a745;
    }
    .header h1 {
      margin: 0 0 10px 0;
      color: #28a745;
    }
    .header p {
      margin: 0;
      color: #666;
    }
  `],
})
class IndividualApp {}

bootstrapApplication(IndividualApp, {
  providers: [provideRouter(individualRoutes)]
}).catch((err) => console.error(err));