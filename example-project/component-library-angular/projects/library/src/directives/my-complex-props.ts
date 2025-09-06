/* tslint:disable */
/* auto-generated angular directive proxy */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import type { Components } from 'component-library/components';

import { defineCustomElement as defineMyComplexProps } from 'component-library/components/my-complex-props.js';

@ProxyCmp({
  defineCustomElementFn: defineMyComplexProps,
  inputs: ['baz', 'foo', 'grault', 'quux', 'waldo']
})
@Component({
  selector: 'my-complex-props',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['baz', 'foo', 'grault', 'quux', 'waldo'],
})
export class MyComplexProps {
  protected el: HTMLMyComplexPropsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MyComplexProps extends Components.MyComplexProps {}


