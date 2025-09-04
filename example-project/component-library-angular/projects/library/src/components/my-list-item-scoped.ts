/* tslint:disable */
/* auto-generated angular directive proxy for my-list-item-scoped */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from '../angular-component-lib/utils';

import type { Components } from 'component-library';


import { defineMyListItemScoped } from './definitions';

export declare interface MyListItemScoped extends Components.MyListItemScoped {}

@ProxyCmp({
  defineCustomElementFn: defineMyListItemScoped
})
@Component({
  selector: 'my-list-item-scoped',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class MyListItemScoped {
  protected el: HTMLMyListItemScopedElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}