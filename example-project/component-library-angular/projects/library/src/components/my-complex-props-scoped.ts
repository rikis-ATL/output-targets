/* tslint:disable */
/* auto-generated angular directive proxy for my-complex-props-scoped */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from '../directives/component-utilities';

import type { Components } from 'component-library';


import { defineMyComplexPropsScoped } from './definitions';



@ProxyCmp({
  defineCustomElementFn: defineMyComplexPropsScoped,
  inputs: ['foo', 'baz', 'quux', 'grault', 'waldo']
})
@Component({
  selector: 'my-complex-props-scoped',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['foo', 'baz', 'quux', 'grault', 'waldo'],
  standalone: true
})
export class MyComplexPropsScoped {
  protected el: HTMLMyComplexPropsScopedElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}