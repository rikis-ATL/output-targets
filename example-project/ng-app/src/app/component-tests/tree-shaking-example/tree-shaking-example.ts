import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
// Tree-shaking example: Import only the specific components you need
// This will only bundle the MyButton component instead of the entire library
import { MyButton } from 'component-library-angular/components/my-button';
import { MyCounter } from 'component-library-angular/components/my-counter';

@Component({
  selector: 'app-tree-shaking-example',
  imports: [RouterLink, MyButton, MyCounter],
  templateUrl: './tree-shaking-example.html',
  styles: `
    .demo-section {
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .info {
      background: #f0f8ff;
      padding: 15px;
      border-radius: 4px;
      margin-bottom: 15px;
      font-family: monospace;
      font-size: 0.9em;
    }
  `,
})
export class TreeShakingExample {
  clicked: number = 0;

  handleClick() {
    this.clicked++;
  }
}
