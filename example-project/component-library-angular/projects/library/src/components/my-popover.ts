/* tslint:disable */
/* auto-generated angular directive proxy for my-popover */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, EventEmitter, Output } from '@angular/core';

import { ProxyCmp } from '../angular-component-lib/utils';

import type { Components } from 'component-library';


import { defineMyPopover } from './definitions';

import type { OverlayEventDetail as IMyPopoverOverlayEventDetail } from 'component-library/components';

export declare interface MyPopover extends Components.MyPopover {
  /**
   * Emitted after the popover has presented.
   */
  myPopoverDidPresent: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted before the popover has presented.
   */
  myPopoverWillPresent: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted before the popover has dismissed.
   */
  myPopoverWillDismiss: EventEmitter<CustomEvent<IMyPopoverOverlayEventDetail>>;
  /**
   * Emitted after the popover has dismissed.
   */
  myPopoverDidDismiss: EventEmitter<CustomEvent<IMyPopoverOverlayEventDetail>>;
}

@ProxyCmp({
  defineCustomElementFn: defineMyPopover,
  inputs: ['component', 'componentProps', 'keyboardClose', 'cssClass', 'backdropDismiss', 'event', 'showBackdrop', 'translucent', 'animated', 'mode'],
  methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']
})
@Component({
  selector: 'my-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [{ name: 'component', required: true }, 'componentProps', 'keyboardClose', 'cssClass', 'backdropDismiss', 'event', 'showBackdrop', 'translucent', 'animated', 'mode'],
  outputs: ['myPopoverDidPresent', 'myPopoverWillPresent', 'myPopoverWillDismiss', 'myPopoverDidDismiss'],
})
export class MyPopover {
  protected el: HTMLMyPopoverElement;
  @Output() myPopoverDidPresent = new EventEmitter<CustomEvent<void>>();
  @Output() myPopoverWillPresent = new EventEmitter<CustomEvent<void>>();
  @Output() myPopoverWillDismiss = new EventEmitter<CustomEvent<IMyPopoverOverlayEventDetail>>();
  @Output() myPopoverDidDismiss = new EventEmitter<CustomEvent<IMyPopoverOverlayEventDetail>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}