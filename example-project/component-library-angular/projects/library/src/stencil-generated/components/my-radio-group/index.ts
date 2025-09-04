/*
 * Secondary entry point for my-radio-group
 * Enables tree-shaking by allowing imports like:
 * import { MyRadioGroup } from '@my-lib/my-radio-group';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyRadioGroup } from '../../../proxies';
