/* tslint:disable */
/* auto-generated angular directive proxy for my-checkbox */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, EventEmitter, Output } from '@angular/core';

import { ProxyCmp } from '../angular-component-lib/utils';

import type { Components } from 'component-library';


import { defineMyCheckbox } from './definitions';

import type { CheckboxChangeEventDetail as IMyCheckboxCheckboxChangeEventDetail } from 'component-library/components';
import type { CheckboxChangeNestedEventDetail as IMyCheckboxCheckboxChangeNestedEventDetail } from 'component-library/components';

export declare interface MyCheckbox extends Components.MyCheckbox {
  /**
   * Emitted when the checked property has changed as a result of a user action such as a click.

This event will not emit when programmatically setting the `checked` property.
   */
  ionChange: EventEmitter<CustomEvent<IMyCheckboxCheckboxChangeEventDetail>>;
  /**
   * Same as `ionChange`, but with a nested object for the value.
For demonstration purposes to be able to test ways to handle more complex events.
   */
  ionChangeNested: EventEmitter<CustomEvent<IMyCheckboxCheckboxChangeNestedEventDetail>>;
  /**
   * Emitted when the checkbox has focus.
   */
  ionFocus: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the checkbox loses focus.
   */
  ionBlur: EventEmitter<CustomEvent<void>>;
}

@ProxyCmp({
  defineCustomElementFn: defineMyCheckbox,
  inputs: ['color', 'name', 'checked', 'indeterminate', 'disabled', 'value', 'labelPlacement', 'justify', 'alignment', 'mode']
})
@Component({
  selector: 'my-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'name', 'checked', 'indeterminate', 'disabled', 'value', 'labelPlacement', 'justify', 'alignment', 'mode'],
  outputs: ['ionChange', 'ionChangeNested', 'ionFocus', 'ionBlur'],
  standalone: true
})
export class MyCheckbox {
  protected el: HTMLMyCheckboxElement;
  @Output() ionChange = new EventEmitter<CustomEvent<IMyCheckboxCheckboxChangeEventDetail>>();
  @Output() ionChangeNested = new EventEmitter<CustomEvent<IMyCheckboxCheckboxChangeNestedEventDetail>>();
  @Output() ionFocus = new EventEmitter<CustomEvent<void>>();
  @Output() ionBlur = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}