// Re-export defineCustomElement functions for individual component imports
// This file provides a stable import path that works with TypeScript module resolution

import { 
  defineCustomElementMyButton,
  defineCustomElementMyButtonScoped,
  defineCustomElementMyCheckbox,
  defineCustomElementMyComplexProps,
  defineCustomElementMyComplexPropsScoped,
  defineCustomElementMyComponent,
  defineCustomElementMyComponentScoped,
  defineCustomElementMyCounter,
  defineCustomElementMyInput,
  defineCustomElementMyInputScoped,
  defineCustomElementMyList,
  defineCustomElementMyListItem,
  defineCustomElementMyListItemScoped,
  defineCustomElementMyListScoped,
  defineCustomElementMyPopover,
  defineCustomElementMyRadio,
  defineCustomElementMyRadioGroup,
  defineCustomElementMyRange,
  defineCustomElementMyToggle,
  defineCustomElementMyToggleContent
} from 'component-library/components/index.js';

export { defineCustomElementMyButton as defineMyButton };
export { defineCustomElementMyButtonScoped as defineMyButtonScoped };
export { defineCustomElementMyCheckbox as defineMyCheckbox };
export { defineCustomElementMyComplexProps as defineMyComplexProps };
export { defineCustomElementMyComplexPropsScoped as defineMyComplexPropsScoped };
export { defineCustomElementMyComponent as defineMyComponent };
export { defineCustomElementMyComponentScoped as defineMyComponentScoped };
export { defineCustomElementMyCounter as defineMyCounter };
export { defineCustomElementMyInput as defineMyInput };
export { defineCustomElementMyInputScoped as defineMyInputScoped };
export { defineCustomElementMyList as defineMyList };
export { defineCustomElementMyListItem as defineMyListItem };
export { defineCustomElementMyListItemScoped as defineMyListItemScoped };
export { defineCustomElementMyListScoped as defineMyListScoped };
export { defineCustomElementMyPopover as defineMyPopover };
export { defineCustomElementMyRadio as defineMyRadio };
export { defineCustomElementMyRadioGroup as defineMyRadioGroup };
export { defineCustomElementMyRange as defineMyRange };
export { defineCustomElementMyToggle as defineMyToggle };
export { defineCustomElementMyToggleContent as defineMyToggleContent };