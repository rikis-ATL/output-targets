/* tslint:disable */
/* auto-generated angular directive proxy for my-button */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, EventEmitter, Output } from '@angular/core';

import { ProxyCmp } from '../directives/component-utilities';

import type { Components } from 'component-library';


import { defineMyButton } from './definitions';



@ProxyCmp({
  defineCustomElementFn: defineMyButton,
  inputs: ['color', 'buttonType', 'disabled', 'expand', 'fill', 'download', 'href', 'rel', 'shape', 'size', 'strong', 'target', 'type', 'mode']
})
@Component({
  selector: 'my-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'buttonType', 'disabled', 'expand', 'fill', 'download', 'href', 'rel', 'shape', 'size', 'strong', 'target', 'type', 'mode'],
  outputs: ['myFocus', 'myBlur'],
  standalone: true
})
export class MyButton {
  protected el: HTMLMyButtonElement;
  @Output() myFocus = new EventEmitter<CustomEvent<void>>();
  @Output() myBlur = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}