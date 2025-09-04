import { Component } from '@angular/core';
// Legacy bulk import - imports all components (larger bundle size)
import { MyComponent, MyCounter, MyToggle } from 'component-library-angular';
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
    MyToggle,
    CheckboxTests,
    InputFormTests,
    ButtonTests,
    ComplexPropsTests,
    RadioGroupTests,
    RangeTests,
  ],
  templateUrl: './component-tests.html',
  styles: ``,
})
export class ComponentTests {}
