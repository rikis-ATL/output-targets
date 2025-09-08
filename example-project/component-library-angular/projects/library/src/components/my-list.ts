/* tslint:disable */
/* auto-generated angular directive proxy */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from '../directives/angular-component-lib/utils';

import type { Components } from 'component-library/components';

import { defineCustomElement as defineMyList } from 'component-library/components/my-list.js';

@ProxyCmp({
  defineCustomElementFn: defineMyList
})
@Component({
  selector: 'my-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class MyList {
  protected el: HTMLMyListElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MyList extends Components.MyList {}


