import { Component } from '@angular/core';
// Bulk import - imports ALL components from main package 
// This should result in larger bundle size due to lack of tree shaking
import { 
  MyButton, 
  MyCheckbox, 
  MyInput,
  MyComponent,
  MyCounter,
  MyList,
  MyListItem,
  MyPopover,
  MyRadio,
  MyRadioGroup,
  MyRange,
  MyToggle,
  MyToggleContent,
  MyComplexProps
} from 'component-library-angular';

@Component({
  selector: 'app-bulk-import-test',
  imports: [MyButton, MyCheckbox, MyInput], // Only use 3 components despite importing all
  template: `
    <div class="container">
      <h2>Bulk Import Test (No Tree Shaking)</h2>
      <p>This component imports ALL components from the main package:</p>
      <ul>
        <li>MyButton, MyCheckbox, MyInput (used)</li>
        <li>MyComponent, MyCounter, MyList, MyListItem (imported but not used)</li>
        <li>MyPopover, MyRadio, MyRadioGroup, MyRange (imported but not used)</li>
        <li>MyToggle, MyToggleContent, MyComplexProps (imported but not used)</li>
      </ul>
      
      <div class="warning">
        <strong>⚠️ Bundle Size Impact:</strong> 
        This imports ALL components even though only 3 are used, 
        preventing effective tree shaking.
      </div>
      
      <div class="component-showcase">
        <my-button (click)="buttonClicked()">
          Bulk Import Button ({{ clickCount }})
        </my-button>
        
        <my-checkbox 
          [checked]="checkboxValue" 
          (ionChange)="checkboxChanged($event)">
          Bulk Import Checkbox
        </my-checkbox>
        
        <my-input 
          placeholder="Bulk import input"
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
    
    ul {
      background: #f0f0f0;
      padding: 15px;
      border-radius: 4px;
    }
    
    .warning {
      margin: 15px 0;
      padding: 15px;
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 4px;
      color: #856404;
    }
  `],
})
export class BulkImportTest {
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