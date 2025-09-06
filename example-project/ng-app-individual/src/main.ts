import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
// NEW PATTERN: Import from individual component files for tree shaking
// This enables bundlers to only include the components that are actually used
import { MyButton } from 'component-library-angular/src/directives/my-button';
import { MyCheckbox } from 'component-library-angular/src/directives/my-checkbox'; 
import { MyInput } from 'component-library-angular/src/directives/my-input';

@Component({
  selector: 'app-root',
  imports: [MyButton, MyCheckbox, MyInput],
  template: `
    <div class="header">
      <h1>🌳 Individual Import Pattern (Tree Shaking)</h1>
      <p>This app uses individual component imports for optimal tree shaking</p>
      <div class="import-examples">
        <code>import {{ MyButton }} from 'component-library-angular/src/directives/my-button';</code>
        <code>import {{ MyCheckbox }} from 'component-library-angular/src/directives/my-checkbox';</code>
        <code>import {{ MyInput }} from 'component-library-angular/src/directives/my-input';</code>
      </div>
    </div>
    
    <div class="container">
      <div class="success">
        <strong>✅ Tree Shaking Enabled:</strong> 
        Each component is imported from its own file, allowing bundlers to 
        include only the components that are actually used in the application.
      </div>
      
      <div class="component-showcase">
        <my-button (click)="buttonClicked()">
          Tree-Shaken Button ({{ clickCount }})
        </my-button>
        
        <my-checkbox 
          [checked]="checkboxValue" 
          (ionChange)="checkboxChanged($event)">
          Tree-Shaken Checkbox
        </my-checkbox>
        
        <my-input 
          placeholder="Tree-shaken input"
          [value]="inputValue"
          (myChange)="inputChanged($event)">
        </my-input>
      </div>
      
      <div class="status">
        <p>Button clicks: {{ clickCount }}</p>
        <p>Checkbox: {{ checkboxValue ? 'Checked' : 'Unchecked' }}</p>
        <p>Input value: {{ inputValue }}</p>
      </div>
      
      <div class="benefits">
        <h3>Tree Shaking Benefits:</h3>
        <ul>
          <li>Only used components are included in the bundle</li>
          <li>Smaller bundle sizes for better performance</li>
          <li>Faster loading times</li>
          <li>Reduced memory usage</li>
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
    
    .benefits {
      margin-top: 20px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 4px;
      border: 1px solid #dee2e6;
    }
    
    .benefits h3 {
      margin-top: 0;
      color: #495057;
    }
    
    .benefits ul {
      margin-bottom: 0;
    }
  `],
})
class IndividualImportApp {
  clickCount = 0;
  checkboxValue = false;
  inputValue = '';

  buttonClicked() {
    this.clickCount++;
  }

  checkboxChanged(event: any) {
    this.checkboxValue = event.detail.checked;
  }

  inputChanged(event: any) {
    this.inputValue = event.detail.value;
  }
}

bootstrapApplication(IndividualImportApp)
  .catch((err) => console.error(err));
