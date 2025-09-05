/* tslint:disable */
/* auto-generated angular directive proxy for my-radio */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, EventEmitter, Output } from '@angular/core';

import { ProxyCmp } from '../directives/component-utilities';

import type { Components } from 'component-library';


import { defineMyRadio } from './definitions';



@ProxyCmp({
  defineCustomElementFn: defineMyRadio,
  inputs: ['color', 'name', 'disabled', 'value', 'labelPlacement', 'justify', 'alignment', 'mode']
})
@Component({
  selector: 'my-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'name', 'disabled', 'value', 'labelPlacement', 'justify', 'alignment', 'mode'],
  outputs: ['ionFocus', 'ionBlur'],
  standalone: true
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