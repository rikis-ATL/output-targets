/* tslint:disable */
/* auto-generated angular directive proxy */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from '../directives/angular-component-lib/utils';

import type { Components } from 'component-library/components';

import { defineCustomElement as defineMyToggleContent } from 'component-library/components/my-toggle-content.js';

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
})
export class MyToggleContent {
  protected el: HTMLMyToggleContentElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MyToggleContent extends Components.MyToggleContent {}


