/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './component-utilities';

import type { Components } from 'component-library/components';

import { defineCustomElementMyButton as defineMyButton } from 'component-library/components/index.js';
import { defineCustomElementMyButtonScoped as defineMyButtonScoped } from 'component-library/components/index.js';
import { defineCustomElementMyCheckbox as defineMyCheckbox } from 'component-library/components/index.js';
import { defineCustomElementMyComplexProps as defineMyComplexProps } from 'component-library/components/index.js';
import { defineCustomElementMyComplexPropsScoped as defineMyComplexPropsScoped } from 'component-library/components/index.js';
import { defineCustomElementMyComponent as defineMyComponent } from 'component-library/components/index.js';
import { defineCustomElementMyComponentScoped as defineMyComponentScoped } from 'component-library/components/index.js';
import { defineCustomElementMyCounter as defineMyCounter } from 'component-library/components/index.js';
import { defineCustomElementMyInput as defineMyInput } from 'component-library/components/index.js';
import { defineCustomElementMyInputScoped as defineMyInputScoped } from 'component-library/components/index.js';
import { defineCustomElementMyList as defineMyList } from 'component-library/components/index.js';
import { defineCustomElementMyListItem as defineMyListItem } from 'component-library/components/index.js';
import { defineCustomElementMyListItemScoped as defineMyListItemScoped } from 'component-library/components/index.js';
import { defineCustomElementMyListScoped as defineMyListScoped } from 'component-library/components/index.js';
import { defineCustomElementMyPopover as defineMyPopover } from 'component-library/components/index.js';
import { defineCustomElementMyRadio as defineMyRadio } from 'component-library/components/index.js';
import { defineCustomElementMyRadioGroup as defineMyRadioGroup } from 'component-library/components/index.js';
import { defineCustomElementMyRange as defineMyRange } from 'component-library/components/index.js';
import { defineCustomElementMyToggle as defineMyToggle } from 'component-library/components/index.js';
import { defineCustomElementMyToggleContent as defineMyToggleContent } from 'component-library/components/index.js';
@ProxyCmp({
  defineCustomElementFn: defineMyButton,
  inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'href', 'mode', 'rel', 'shape', 'size', 'strong', 'target', 'type']
})
@Component({
  selector: 'my-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'href', 'mode', 'rel', 'shape', 'size', 'strong', 'target', 'type'],
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




export declare interface MyButton extends Components.MyButton {
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
  inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'href', 'mode', 'rel', 'shape', 'size', 'strong', 'target', 'type']
})
@Component({
  selector: 'my-button-scoped',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['buttonType', 'color', 'disabled', 'download', 'expand', 'fill', 'href', 'mode', 'rel', 'shape', 'size', 'strong', 'target', 'type'],
  outputs: ['myFocus', 'myBlur'],
  standalone: true
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
  defineCustomElementFn: defineMyCheckbox,
  inputs: ['alignment', 'checked', 'color', 'disabled', 'indeterminate', 'justify', 'labelPlacement', 'mode', 'name', 'value']
})
@Component({
  selector: 'my-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignment', 'checked', 'color', 'disabled', 'indeterminate', 'justify', 'labelPlacement', 'mode', 'name', 'value'],
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
  defineCustomElementFn: defineMyComplexProps,
  inputs: ['baz', 'foo', 'grault', 'quux', 'waldo']
})
@Component({
  selector: 'my-complex-props',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['baz', 'foo', 'grault', 'quux', 'waldo'],
  standalone: true
})
export class MyComplexProps {
  protected el: HTMLMyComplexPropsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}





@ProxyCmp({
  defineCustomElementFn: defineMyComplexPropsScoped,
  inputs: ['baz', 'foo', 'grault', 'quux', 'waldo']
})
@Component({
  selector: 'my-complex-props-scoped',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['baz', 'foo', 'grault', 'quux', 'waldo'],
  standalone: true
})
export class MyComplexPropsScoped {
  protected el: HTMLMyComplexPropsScopedElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}





@ProxyCmp({
  defineCustomElementFn: defineMyComponent,
  inputs: ['first', 'last', 'middleName']
})
@Component({
  selector: 'my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['first', 'last', 'middleName'],
  standalone: true
})
export class MyComponent {
  protected el: HTMLMyComponentElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}





@ProxyCmp({
  defineCustomElementFn: defineMyComponentScoped,
  inputs: ['first', 'last', 'middleName']
})
@Component({
  selector: 'my-component-scoped',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['first', 'last', 'middleName'],
  outputs: ['myCustomEvent'],
  standalone: true
})
export class MyComponentScoped {
  protected el: HTMLMyComponentScopedElement;
  @Output() myCustomEvent = new EventEmitter<CustomEvent<IMyComponentScopedIMyComponent.someVar>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { IMyComponent as IMyComponentScopedIMyComponent } from 'component-library/components';

export declare interface MyComponentScoped extends Components.MyComponentScoped {
  /**
   * Testing an event without value
   */
  myCustomEvent: EventEmitter<CustomEvent<IMyComponentScopedIMyComponent.someVar>>;
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




export declare interface MyCounter extends Components.MyCounter {
  /**
   * Emitted when the count changes
   */
  count: EventEmitter<CustomEvent<number>>;
}


@ProxyCmp({
  defineCustomElementFn: defineMyInput,
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'mode', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'],
  methods: ['setFocus', 'getInputElement']
})
@Component({
  selector: 'my-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'mode', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'],
  outputs: ['myInput', 'myChange', 'myBlur', 'myFocus'],
  standalone: true
})
export class MyInput {
  protected el: HTMLMyInputElement;
  @Output() myInput = new EventEmitter<CustomEvent<KeyboardEvent>>();
  @Output() myChange = new EventEmitter<CustomEvent<IMyInputInputChangeEventDetail>>();
  @Output() myBlur = new EventEmitter<CustomEvent<void>>();
  @Output() myFocus = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { InputChangeEventDetail as IMyInputInputChangeEventDetail } from 'component-library/components';

export declare interface MyInput extends Components.MyInput {
  /**
   * Emitted when a keyboard input occurred.
   */
  myInput: EventEmitter<CustomEvent<KeyboardEvent>>;
  /**
   * Emitted when the value has changed.
   */
  myChange: EventEmitter<CustomEvent<IMyInputInputChangeEventDetail>>;
  /**
   * Emitted when the input loses focus.
   */
  myBlur: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the input has focus.
   */
  myFocus: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineMyInputScoped,
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'mode', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'],
  methods: ['setFocus', 'getInputElement']
})
@Component({
  selector: 'my-input-scoped',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accept', 'autocapitalize', 'autocomplete', 'autocorrect', 'autofocus', 'clearInput', 'clearOnEdit', 'color', 'disabled', 'enterkeyhint', 'inputmode', 'max', 'maxlength', 'min', 'minlength', 'mode', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'size', 'spellcheck', 'step', 'type', 'value'],
  outputs: ['myInput', 'myChange', 'myBlur', 'myFocus'],
  standalone: true
})
export class MyInputScoped {
  protected el: HTMLMyInputScopedElement;
  @Output() myInput = new EventEmitter<CustomEvent<KeyboardEvent>>();
  @Output() myChange = new EventEmitter<CustomEvent<IMyInputScopedInputChangeEventDetail>>();
  @Output() myBlur = new EventEmitter<CustomEvent<void>>();
  @Output() myFocus = new EventEmitter<CustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { InputChangeEventDetail as IMyInputScopedInputChangeEventDetail } from 'component-library/components';

export declare interface MyInputScoped extends Components.MyInputScoped {
  /**
   * Emitted when a keyboard input occurred.
   */
  myInput: EventEmitter<CustomEvent<KeyboardEvent>>;
  /**
   * Emitted when the value has changed.
   */
  myChange: EventEmitter<CustomEvent<IMyInputScopedInputChangeEventDetail>>;
  /**
   * Emitted when the input loses focus.
   */
  myBlur: EventEmitter<CustomEvent<void>>;
  /**
   * Emitted when the input has focus.
   */
  myFocus: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineMyList
})
@Component({
  selector: 'my-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class MyList {
  protected el: HTMLMyListElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}





@ProxyCmp({
  defineCustomElementFn: defineMyListItem
})
@Component({
  selector: 'my-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class MyListItem {
  protected el: HTMLMyListItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}





@ProxyCmp({
  defineCustomElementFn: defineMyListItemScoped
})
@Component({
  selector: 'my-list-item-scoped',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class MyListItemScoped {
  protected el: HTMLMyListItemScopedElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}





@ProxyCmp({
  defineCustomElementFn: defineMyListScoped
})
@Component({
  selector: 'my-list-scoped',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class MyListScoped {
  protected el: HTMLMyListScopedElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}





@ProxyCmp({
  defineCustomElementFn: defineMyPopover,
  inputs: ['animated', 'backdropDismiss', 'component', 'componentProps', 'cssClass', 'event', 'keyboardClose', 'mode', 'showBackdrop', 'translucent'],
  methods: ['present', 'dismiss', 'onDidDismiss', 'onWillDismiss']
})
@Component({
  selector: 'my-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animated', 'backdropDismiss', { name: 'component', required: true }, 'componentProps', 'cssClass', 'event', 'keyboardClose', 'mode', 'showBackdrop', 'translucent'],
  outputs: ['myPopoverDidPresent', 'myPopoverWillPresent', 'myPopoverWillDismiss', 'myPopoverDidDismiss'],
  standalone: true
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


import type { RadioGroupChangeEventDetail as IMyRadioGroupRadioGroupChangeEventDetail } from 'component-library/components';

export declare interface MyRadioGroup extends Components.MyRadioGroup {
  /**
   * Emitted when the value has changed.

This event will not emit when programmatically setting the `value` property.
   */
  myChange: EventEmitter<CustomEvent<IMyRadioGroupRadioGroupChangeEventDetail>>;
}


@ProxyCmp({
  defineCustomElementFn: defineMyRange,
  inputs: ['color', 'debounce', 'disabled', 'dualKnobs', 'max', 'min', 'mode', 'name', 'pin', 'snaps', 'step', 'ticks', 'value']
})
@Component({
  selector: 'my-range',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'debounce', 'disabled', 'dualKnobs', 'max', 'min', 'mode', 'name', 'pin', 'snaps', 'step', 'ticks', 'value'],
  outputs: ['myChange', 'myFocus', 'myBlur'],
  standalone: true
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


import type { RangeChangeEventDetail as IMyRangeRangeChangeEventDetail } from 'component-library/components';
import type { StyleEventDetail as IMyRangeStyleEventDetail } from 'component-library/components';

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
  defineCustomElementFn: defineMyToggle
})
@Component({
  selector: 'my-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  standalone: true
})
export class MyToggle {
  protected el: HTMLMyToggleElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}





@ProxyCmp({
  defineCustomElementFn: defineMyToggleContent,
  inputs: ['visible']
})
@Component({
  selector: 'my-toggle-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['visible'],
  standalone: true
})
export class MyToggleContent {
  protected el: HTMLMyToggleContentElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}





