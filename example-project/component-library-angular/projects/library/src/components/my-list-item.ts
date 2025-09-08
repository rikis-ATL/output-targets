/* tslint:disable */
/* auto-generated angular directive proxy */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from '../directives/angular-component-lib/utils';

import type { Components } from 'component-library/components';

import { defineCustomElement as defineMyListItem } from 'component-library/components/my-list-item.js';

@ProxyCmp({
  defineCustomElementFn: defineMyListItem
})
@Component({
  selector: 'my-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class MyListItem {
  protected el: HTMLMyListItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MyListItem extends Components.MyListItem {}


