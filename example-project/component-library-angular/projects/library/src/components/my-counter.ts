/* tslint:disable */
/* auto-generated angular directive proxy for my-counter */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, EventEmitter, Output } from '@angular/core';

import { ProxyCmp } from '../directives/component-utilities';

import type { Components } from 'component-library';


import { defineMyCounter } from './definitions';

export declare interface MyCounter extends Components.MyCounter {
  /**
   * Emitted when the count changes
   */
  count: EventEmitter<CustomEvent<number>>;
}

@ProxyCmp({
  defineCustomElementFn: defineMyCounter,
  inputs: ['startValue']
})
@Component({
  selector: 'my-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['startValue'],
  outputs: ['count'],
  standalone: true
})
export class MyCounter {
  protected el: HTMLMyCounterElement;
  @Output() count = new EventEmitter<CustomEvent<number>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}