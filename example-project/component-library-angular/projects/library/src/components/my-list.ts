/* tslint:disable */
/* auto-generated angular directive proxy for my-list */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from '../directives/component-utilities';

import type { Components } from 'component-library';


import { defineMyList } from './definitions';



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