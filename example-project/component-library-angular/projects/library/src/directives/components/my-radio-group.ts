/* tslint:disable */
/* auto-generated angular directive proxy for my-radio-group */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, EventEmitter, Output } from '@angular/core';

import { ProxyCmp } from '../directives/component-utilities';

import type { Components } from 'component-library';


import { defineMyRadioGroup } from './definitions';

import type { RadioGroupChangeEventDetail as IMyRadioGroupRadioGroupChangeEventDetail } from 'component-library/components';

export declare interface MyRadioGroup extends Components.MyRadioGroup {
  /**
   * Emitted when the value has changed.

This event will not emit when programmatically setting the `value` property.
   */
  myChange: EventEmitter<CustomEvent<IMyRadioGroupRadioGroupChangeEventDetail>>;
}

@ProxyCmp({
  defineCustomElementFn: defineMyRadioGroup,
  inputs: ['allowEmptySelection', 'compareWith', 'name', 'value']
})
@Component({
  selector: 'my-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowEmptySelection', 'compareWith', 'name', 'value'],
  outputs: ['myChange'],
  standalone: true
})
export class MyRadioGroup {
  protected el: HTMLMyRadioGroupElement;
  @Output() myChange = new EventEmitter<CustomEvent<IMyRadioGroupRadioGroupChangeEventDetail>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}