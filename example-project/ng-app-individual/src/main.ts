import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
// NEW PATTERN: Import from the main package, but only specific components for tree shaking
// This enables bundlers to only include the components that are actually used
// TESTING: Only importing MyButton to verify tree shaking excludes other components
import { MyButton } from 'component-library-angular';

@Component({
  selector: 'app-root',
  imports: [MyButton],
  template: `
    <div class="header">
      <h1>🌳 Single Component Test (Tree Shaking Verification)</h1>
      <p>This app imports ONLY MyButton to verify tree shaking excludes other components</p>
      <div class="import-examples">
        <code>import MyButton from 'component-library-angular';</code>
        <div class="excluded">
          <strong>NOT imported:</strong>
          <span>MyCheckbox, MyInput, and other components should be excluded from bundle</span>
        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="success">
        <strong>✅ Single Component Test:</strong> 
        Only MyButton is imported. Build analysis should show that MyCheckbox, MyInput, 
        and all other components are completely excluded from the bundle.
      </div>
      
      <div class="component-showcase">
        <my-button (click)="buttonClicked()">
          Single Component Button
        </my-button>
      </div>
      
      <div class="status">
        <p>Button has been clicked <span [textContent]="clickCount"></span> times</p>
      </div>
      
      <div class="verification">
        <h3>Bundle Verification Instructions:</h3>
        <ul>
          <li>Build this app and run npm run build</li>
          <li>Inspect dist folder contents</li>
          <li>Search bundle for MyCheckbox or MyInput - should find ZERO matches</li>
          <li>Only MyButton-related code should be present</li>
          <li>Run npm run analyze to view bundle composition</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .header {
      background: #d4edda;
      padding: 20px;
      text-align: center;
      border-bottom: 2px solid #28a745;
    }
    .header h1 {
      margin: 0 0 10px 0;
      color: #28a745;
    }
    .header p {
      margin: 5px 0;
      color: #666;
    }
    .import-examples {
      margin-top: 15px;
      text-align: left;
      display: inline-block;
    }
    .import-examples code {
      display: block;
      background: #f8f9fa;
      padding: 5px 8px;
      margin: 2px 0;
      border-radius: 3px;
      font-family: monospace;
      font-size: 0.9em;
      border: 1px solid #dee2e6;
    }
    .excluded {
      margin-top: 10px;
      padding: 8px;
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 3px;
      font-size: 0.9em;
    }
    .excluded strong {
      color: #856404;
    }
    
    .container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .component-showcase {
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #f9f9f9;
    }
    
    .component-showcase > * {
      margin: 10px 0;
      display: block;
    }
    
    .status {
      margin-top: 20px;
      padding: 15px;
      background: #e8f5e8;
      border-radius: 4px;
    }
    
    .success {
      margin: 15px 0;
      padding: 15px;
      background: #d4edda;
      border: 1px solid #c3e6cb;
      border-radius: 4px;
      color: #155724;
    }
    
    .verification {
      margin-top: 20px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 4px;
      border: 1px solid #dee2e6;
    }
    
    .verification h3 {
      margin-top: 0;
      color: #495057;
    }
    
    .verification ul {
      margin-bottom: 0;
    }
    
    .verification code {
      background: #e9ecef;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: monospace;
      font-size: 0.9em;
    }
  `],
})
class IndividualImportApp {
  clickCount = 0;

  buttonClicked() {
    this.clickCount++;
  }
}

bootstrapApplication(IndividualImportApp)
  .catch((err) => console.error(err));
