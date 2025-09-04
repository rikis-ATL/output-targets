/* tslint:disable */
/* auto-generated angular directive proxy for my-complex-props */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from '../angular-component-lib/utils';

import type { Components } from 'component-library';


import { defineMyComplexProps } from './definitions';

export declare interface MyComplexProps extends Components.MyComplexProps {}

@ProxyCmp({
  defineCustomElementFn: defineMyComplexProps,
  inputs: ['foo', 'baz', 'quux', 'grault', 'waldo']
})
@Component({
  selector: 'my-complex-props',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['foo', 'baz', 'quux', 'grault', 'waldo'],
})
export class MyComplexProps {
  protected el: HTMLMyComplexPropsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}