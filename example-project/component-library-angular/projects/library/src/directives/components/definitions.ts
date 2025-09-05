// Re-export defineCustomElement functions for individual component imports
// This file provides a stable import path that works with TypeScript module resolution

import {
  defineCustomElementMyButton as defineMyButton,
  defineCustomElementMyButtonScoped as defineMyButtonScoped,
  defineCustomElementMyCheckbox as defineMyCheckbox,
  defineCustomElementMyComplexProps as defineMyComplexProps,
  defineCustomElementMyComplexPropsScoped as defineMyComplexPropsScoped,
  defineCustomElementMyComponent as defineMyComponent,
  defineCustomElementMyComponentScoped as defineMyComponentScoped,
  defineCustomElementMyCounter as defineMyCounter,
  defineCustomElementMyInput as defineMyInput,
  defineCustomElementMyInputScoped as defineMyInputScoped,
  defineCustomElementMyList as defineMyList,
  defineCustomElementMyListItem as defineMyListItem,
  defineCustomElementMyListItemScoped as defineMyListItemScoped,
  defineCustomElementMyListScoped as defineMyListScoped,
  defineCustomElementMyPopover as defineMyPopover,
  defineCustomElementMyRadio as defineMyRadio,
  defineCustomElementMyRadioGroup as defineMyRadioGroup,
  defineCustomElementMyRange as defineMyRange,
  defineCustomElementMyToggle as defineMyToggle,
  defineCustomElementMyToggleContent as defineMyToggleContent
} from 'component-library/components';

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