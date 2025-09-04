// Re-export defineCustomElement functions for individual component imports
// This file provides a stable import path that works with TypeScript module resolution

import { defineCustomElement as defineMyButton } from 'component-library/components/my-button.js';
import { defineCustomElement as defineMyButtonScoped } from 'component-library/components/my-button-scoped.js';
import { defineCustomElement as defineMyCheckbox } from 'component-library/components/my-checkbox.js';
import { defineCustomElement as defineMyComplexProps } from 'component-library/components/my-complex-props.js';
import { defineCustomElement as defineMyComplexPropsScoped } from 'component-library/components/my-complex-props-scoped.js';
import { defineCustomElement as defineMyComponent } from 'component-library/components/my-component.js';
import { defineCustomElement as defineMyComponentScoped } from 'component-library/components/my-component-scoped.js';
import { defineCustomElement as defineMyCounter } from 'component-library/components/my-counter.js';
import { defineCustomElement as defineMyInput } from 'component-library/components/my-input.js';
import { defineCustomElement as defineMyInputScoped } from 'component-library/components/my-input-scoped.js';
import { defineCustomElement as defineMyList } from 'component-library/components/my-list.js';
import { defineCustomElement as defineMyListItem } from 'component-library/components/my-list-item.js';
import { defineCustomElement as defineMyListItemScoped } from 'component-library/components/my-list-item-scoped.js';
import { defineCustomElement as defineMyListScoped } from 'component-library/components/my-list-scoped.js';
import { defineCustomElement as defineMyPopover } from 'component-library/components/my-popover.js';
import { defineCustomElement as defineMyRadio } from 'component-library/components/my-radio.js';
import { defineCustomElement as defineMyRadioGroup } from 'component-library/components/my-radio-group.js';
import { defineCustomElement as defineMyRange } from 'component-library/components/my-range.js';
import { defineCustomElement as defineMyToggle } from 'component-library/components/my-toggle.js';
import { defineCustomElement as defineMyToggleContent } from 'component-library/components/my-toggle-content.js';

export { defineMyButton };
export { defineMyButtonScoped };
export { defineMyCheckbox };
export { defineMyComplexProps };
export { defineMyComplexPropsScoped };
export { defineMyComponent };
export { defineMyComponentScoped };
export { defineMyCounter };
export { defineMyInput };
export { defineMyInputScoped };
export { defineMyList };
export { defineMyListItem };
export { defineMyListItemScoped };
export { defineMyListScoped };
export { defineMyPopover };
export { defineMyRadio };
export { defineMyRadioGroup };
export { defineMyRange };
export { defineMyToggle };
export { defineMyToggleContent };