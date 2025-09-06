import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { bulkRoutes } from './app/bulk.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <div class="header">
      <h1>📦 Bundle Test - Bulk Imports</h1>
      <p>This build imports all components from main package</p>
    </div>
    <router-outlet />
  `,
  styles: [`
    .header {
      background: #fff3cd;
      padding: 20px;
      text-align: center;
      border-bottom: 2px solid #ffc107;
    }
    .header h1 {
      margin: 0 0 10px 0;
      color: #856404;
    }
    .header p {
      margin: 0;
      color: #666;
    }
  `],
})
class BulkApp {}

bootstrapApplication(BulkApp, {
  providers: [provideRouter(bulkRoutes)]
}).catch((err) => console.error(err));