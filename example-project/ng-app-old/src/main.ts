import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
// OLD PATTERN: Import from main package (proxies.ts approach)
// This imports from the monolithic file, preventing tree shaking
import { MyButton, MyCheckbox, MyInput } from 'component-library-angular';

@Component({
  selector: 'app-root',
  imports: [MyButton, MyCheckbox, MyInput],
  template: `
    <div class="header">
      <h1>📦 Old Import Pattern (No Tree Shaking)</h1>
      <p>This app uses the traditional import pattern from the main package</p>
      <code>import {{ MyButton, MyCheckbox, MyInput }} from 'component-library-angular';</code>
    </div>
    
    <div class="container">
      <div class="warning">
        <strong>⚠️ Bundle Impact:</strong> 
        This imports from the main package which bundles ALL components together,
        preventing effective tree shaking even if you only use a few components.
      </div>
      
      <div class="component-showcase">
        <my-button (click)="buttonClicked()">
          Old Pattern Button ({{ clickCount }})
        </my-button>
        
        <my-checkbox 
          [checked]="checkboxValue" 
          (ionChange)="checkboxChanged($event)">
          Old Pattern Checkbox
        </my-checkbox>
        
        <my-input 
          placeholder="Old pattern input"
          [value]="inputValue"
          (myChange)="inputChanged($event)">
        </my-input>
      </div>
      
      <div class="status">
        <p>Button clicks: {{ clickCount }}</p>
        <p>Checkbox: {{ checkboxValue ? 'Checked' : 'Unchecked' }}</p>
        <p>Input value: {{ inputValue }}</p>
      </div>
    </div>
  `,
  styles: [`
    .header {
      background: #f8d7da;
      padding: 20px;
      text-align: center;
      border-bottom: 2px solid #dc3545;
    }
    .header h1 {
      margin: 0 0 10px 0;
      color: #dc3545;
    }
    .header p, .header code {
      margin: 5px 0;
      color: #666;
    }
    .header code {
      background: #f1f1f1;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: monospace;
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
    
    .warning {
      margin: 15px 0;
      padding: 15px;
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      border-radius: 4px;
      color: #721c24;
    }
  `],
})
class OldPatternApp {
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

bootstrapApplication(OldPatternApp)
  .catch((err) => console.error(err));
