/* tslint:disable */
/* auto-generated angular directive proxy for my-toggle */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from '../directives/component-utilities';

import type { Components } from 'component-library';


import { defineMyToggle } from './definitions';



@ProxyCmp({
  defineCustomElementFn: defineMyToggle
})
@Component({
  selector: 'my-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class MyToggle {
  protected el: HTMLMyToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}