import { Component } from '@angular/core';
// Individual imports for tree shaking test - only import what we need
import { MyButton, MyCheckbox, MyInput } from 'component-library-angular';

@Component({
  selector: 'app-individual-import-test',
  imports: [MyButton, MyCheckbox, MyInput],
  template: `
    <div class="container">
      <h2>Individual Import Test (Tree Shaking)</h2>
      <p>This component imports only specific components needed:</p>
      <ul>
        <li>MyButton from 'component-library-angular'</li>
        <li>MyCheckbox from 'component-library-angular'</li>
        <li>MyInput from 'component-library-angular'</li>
        <li><strong>Only 3 components imported and used</strong></li>
      </ul>
      
      <div class="component-showcase">
        <my-button (click)="buttonClicked()">
          Individual Import Button ({{ clickCount }})
        </my-button>
        
        <my-checkbox 
          [checked]="checkboxValue" 
          (ionChange)="checkboxChanged($event)">
          Individual Import Checkbox
        </my-checkbox>
        
        <my-input 
          placeholder="Individual import input"
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
  `],
})
export class IndividualImportTest {
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