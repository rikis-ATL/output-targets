/* tslint:disable */
/* auto-generated angular directive proxy */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from '../directives/angular-component-lib/utils';

import type { Components } from 'component-library/components';

import { defineCustomElement as defineMyRadio } from 'component-library/components/my-radio.js';

@ProxyCmp({
  defineCustomElementFn: defineMyRadio,
  inputs: ['alignment', 'color', 'disabled', 'justify', 'labelPlacement', 'mode', 'name', 'value']
})
@Component({
  selector: 'my-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignment', 'color', 'disabled', 'justify', 'labelPlacement', 'mode', 'name', 'value'],
  outputs: ['ionFocus', 'ionBlur'],
})
export class MyRadio {
  protected el: HTMLMyRadioElement;
  @Output() ionFocus = new EventEmitter<CustomEvent<void>>();
  @Output() ionBlur = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface MyRadio extends Components.MyRadio {
  /**
   * Emitted when the radio button has focus.
   */
  ionFocus: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the radio button loses focus.
   */
  ionBlur: EventEmitter<CustomEvent<void>>;
}


