/* tslint:disable */
/* auto-generated angular directive proxy for my-toggle */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from '../angular-component-lib/utils';

import type { Components } from 'component-library';


import { defineMyToggle } from './definitions';

export declare interface MyToggle extends Components.MyToggle {}

@ProxyCmp({
  defineCustomElementFn: defineMyToggle
})
@Component({
  selector: 'my-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class MyToggle {
  protected el: HTMLMyToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}