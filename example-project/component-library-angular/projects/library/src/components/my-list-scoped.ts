/* tslint:disable */
/* auto-generated angular directive proxy */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from '../directives/angular-component-lib/utils';

import type { Components } from 'component-library/components';

import { defineCustomElement as defineMyListScoped } from 'component-library/components/my-list-scoped.js';

@ProxyCmp({
  defineCustomElementFn: defineMyListScoped
})
@Component({
  selector: 'my-list-scoped',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class MyListScoped {
  protected el: HTMLMyListScopedElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MyListScoped extends Components.MyListScoped {}


