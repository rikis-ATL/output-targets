/*
 * Secondary entry point for my-checkbox
 * Enables tree-shaking by allowing imports like:
 * import { MyCheckbox } from '@my-lib/my-checkbox';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyCheckbox } from '../../../proxies';
