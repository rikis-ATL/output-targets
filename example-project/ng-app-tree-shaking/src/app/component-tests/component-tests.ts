import { Component } from '@angular/core';
// INDIVIDUAL IMPORTS FOR TRUE TREE-SHAKING - Only 2 components to test bundle size
import { MyComponent } from 'component-library-angular/my-component';
import { MyCounter } from 'component-library-angular/my-counter';

@Component({
  selector: 'app-component-tests',
  imports: [
    MyComponent,
    MyCounter,
  ],
  template: `
    <h1>Tree-Shaking Test App</h1>
    <p>This app imports only 2 components to verify tree-shaking works.</p>
    
    <h2>MyComponent</h2>
    <my-component first="Stencil" last="'Don't call me a framework' JS"></my-component>
    
    <h2>MyCounter</h2>
    <my-counter></my-counter>
  `,
  styles: `
    h1 { color: #369; font-family: Arial, Helvetica, sans-serif; font-size: 250%; }
    h2 { color: #444; font-family: Arial, Helvetica, sans-serif; font-size: 150%; }
    p { font-family: Arial, Helvetica, sans-serif; }
  `,
})
export class ComponentTests {}
