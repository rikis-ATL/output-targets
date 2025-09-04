/* tslint:disable */
/* auto-generated angular directive proxy for my-component-scoped */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, EventEmitter, Output } from '@angular/core';

import { ProxyCmp } from '../angular-component-lib/utils';

import type { Components } from 'component-library';


import { defineMyComponentScoped } from './definitions';

import type { IMyComponent as IMyComponentScopedIMyComponent } from 'component-library/components';

export declare interface MyComponentScoped extends Components.MyComponentScoped {
  /**
   * Testing an event without value
   */
  myCustomEvent: EventEmitter<CustomEvent<IMyComponentScopedIMyComponent.someVar>>;
}

@ProxyCmp({
  defineCustomElementFn: defineMyComponentScoped,
  inputs: ['first', 'middleName', 'last']
})
@Component({
  selector: 'my-component-scoped',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['first', 'middleName', 'last'],
  outputs: ['myCustomEvent'],
})
export class MyComponentScoped {
  protected el: HTMLMyComponentScopedElement;
  @Output() myCustomEvent = new EventEmitter<CustomEvent<IMyComponentScopedIMyComponent.someVar>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}