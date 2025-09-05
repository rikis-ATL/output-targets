/* tslint:disable */
/* auto-generated angular directive proxy for my-toggle-content */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from '../directives/component-utilities';

import type { Components } from 'component-library';


import { defineMyToggleContent } from './definitions';



@ProxyCmp({
  defineCustomElementFn: defineMyToggleContent,
  inputs: ['visible']
})
@Component({
  selector: 'my-toggle-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['visible'],
  standalone: true
})
export class MyToggleContent {
  protected el: HTMLMyToggleContentElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}