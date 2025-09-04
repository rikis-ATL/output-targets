/*
 * Secondary entry point for my-radio
 * Enables tree-shaking by allowing imports like:
 * import { MyRadio } from '@my-lib/my-radio';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyRadio } from '../../../proxies';
