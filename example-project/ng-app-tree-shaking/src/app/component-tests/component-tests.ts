import { Component } from '@angular/core';
// INDIVIDUAL IMPORTS FOR TRUE TREE-SHAKING
import { MyComponent } from 'component-library-angular/my-component';
import { MyCounter } from 'component-library-angular/my-counter';
import { ButtonTests } from './button-tests/button-tests';
import { CheckboxTests } from './checkbox-tests/checkbox-tests';
import { ComplexPropsTests } from './complex-props-tests/complex-props-tests';
import { InputFormTests } from './input-form-tests/input-form-tests';
import { RadioGroupTests } from './radio-group-tests/radio-group-tests';
import { RangeTests } from './range-tests/range-tests';

@Component({
  selector: 'app-component-tests',
  imports: [
    MyComponent,
    MyCounter,
  ],
  templateUrl: './component-tests.html',
  styles: ``,
})
export class ComponentTests {}
