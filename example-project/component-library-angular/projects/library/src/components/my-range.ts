/* tslint:disable */
/* auto-generated angular directive proxy for my-range */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, EventEmitter, Output } from '@angular/core';

import { ProxyCmp } from '../angular-component-lib/utils';

import type { Components } from 'component-library';


import { defineMyRange } from './definitions';

import type { RangeChangeEventDetail as IMyRangeRangeChangeEventDetail } from 'component-library/components';

export declare interface MyRange extends Components.MyRange {
  /**
   * Emitted when the value property has changed.
   */
  myChange: EventEmitter<CustomEvent<IMyRangeRangeChangeEventDetail>>;
  /**
   * Emitted when the range has focus.
   */
  myFocus: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the range loses focus.
   */
  myBlur: EventEmitter<CustomEvent<void>>;
}

@ProxyCmp({
  defineCustomElementFn: defineMyRange,
  inputs: ['color', 'debounce', 'name', 'dualKnobs', 'min', 'max', 'pin', 'snaps', 'step', 'ticks', 'disabled', 'value', 'mode']
})
@Component({
  selector: 'my-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'debounce', 'name', 'dualKnobs', 'min', 'max', 'pin', 'snaps', 'step', 'ticks', 'disabled', 'value', 'mode'],
  outputs: ['myChange', 'myFocus', 'myBlur'],
})
export class MyRange {
  protected el: HTMLMyRangeElement;
  @Output() myChange = new EventEmitter<CustomEvent<IMyRangeRangeChangeEventDetail>>();
  @Output() myFocus = new EventEmitter<CustomEvent<void>>();
  @Output() myBlur = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}