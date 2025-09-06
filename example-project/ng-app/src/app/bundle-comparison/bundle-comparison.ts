import { Component } from '@angular/core';
import { IndividualImportTest } from '../individual-import-test/individual-import-test';
import { BulkImportTest } from '../bulk-import-test/bulk-import-test';

@Component({
  selector: 'app-bundle-comparison',
  imports: [IndividualImportTest, BulkImportTest],
  template: `
    <div class="container">
      <h1>Tree Shaking Bundle Comparison</h1>
      
      <div class="explanation">
        <h3>Tree Shaking Test</h3>
        <p>This page demonstrates the difference between individual and bulk imports 
           from the Angular component library. Use the buttons below to switch between 
           different import strategies and analyze the resulting bundle sizes.</p>
        
        <div class="buttons">
          <button 
            [class.active]="currentTest === 'individual'"
            (click)="currentTest = 'individual'">
            Individual Imports (Tree Shaking)
          </button>
          <button 
            [class.active]="currentTest === 'bulk'"
            (click)="currentTest = 'bulk'">
            Bulk Imports (No Tree Shaking)
          </button>
        </div>
      </div>

      <div class="test-area">
        @if (currentTest === 'individual') {
          <app-individual-import-test></app-individual-import-test>
        }
        
        @if (currentTest === 'bulk') {
          <app-bulk-import-test></app-bulk-import-test>
        }
      </div>

      <div class="instructions">
        <h3>How to Test Bundle Sizes</h3>
        <ol>
          <li>Run <code>npm run build:individual</code> to build with individual imports</li>
          <li>Run <code>npm run build:bulk</code> to build with bulk imports</li>
          <li>Compare the bundle sizes in the respective dist folders</li>
          <li>Use <code>npm run bundle-report</code> for detailed analysis</li>
        </ol>
        
        <div class="expected-results">
          <h4>Expected Results:</h4>
          <ul>
            <li><strong>Individual imports:</strong> Smaller bundle, only includes used components</li>
            <li><strong>Bulk imports:</strong> Larger bundle, includes all components from library</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .explanation {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    
    .buttons {
      margin-top: 15px;
      display: flex;
      gap: 10px;
    }
    
    .buttons button {
      padding: 10px 20px;
      border: 2px solid #007bff;
      background: white;
      color: #007bff;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }
    
    .buttons button:hover {
      background: #e6f3ff;
    }
    
    .buttons button.active {
      background: #007bff;
      color: white;
    }
    
    .test-area {
      margin: 30px 0;
      border: 2px solid #dee2e6;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .instructions {
      background: #e8f5e8;
      padding: 20px;
      border-radius: 8px;
      margin-top: 30px;
    }
    
    .instructions code {
      background: #f1f3f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    
    .instructions ol {
      margin: 15px 0;
    }
    
    .instructions li {
      margin: 8px 0;
    }
    
    .expected-results {
      margin-top: 20px;
      padding: 15px;
      background: white;
      border-radius: 6px;
      border-left: 4px solid #28a745;
    }
    
    .expected-results ul {
      margin: 10px 0 0 20px;
    }
    
    .expected-results li {
      margin: 5px 0;
    }
  `],
})
export class BundleComparison {
  currentTest: 'individual' | 'bulk' = 'individual';
}