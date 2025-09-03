/* tslint:disable */
/* auto-generated angular directive proxy for my-button-scoped */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, EventEmitter, Output } from '@angular/core';

import { ProxyCmp } from '../angular-component-lib/utils';

import type { Components } from 'component-library/components';


import { defineCustomElement as defineMyButtonScoped } from 'component-library/components/my-button-scoped.js';

export declare interface MyButtonScoped extends Components.MyButtonScoped {
  /**
   * Emitted when the button has focus.
   */
  myFocus: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the button loses focus.
   */
  myBlur: EventEmitter<CustomEvent<void>>;
}

@ProxyCmp({
  defineCustomElementFn: defineMyButtonScoped,
  inputs: ['color', 'buttonType', 'disabled', 'expand', 'fill', 'download', 'href', 'rel', 'shape', 'size', 'strong', 'target', 'type', 'mode']
})
@Component({
  selector: 'my-button-scoped',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'buttonType', 'disabled', 'expand', 'fill', 'download', 'href', 'rel', 'shape', 'size', 'strong', 'target', 'type', 'mode'],
  outputs: ['myFocus', 'myBlur'],
})
export class MyButtonScoped {
  protected el: HTMLMyButtonScopedElement;
  @Output() myFocus = new EventEmitter<CustomEvent<void>>();
  @Output() myBlur = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}