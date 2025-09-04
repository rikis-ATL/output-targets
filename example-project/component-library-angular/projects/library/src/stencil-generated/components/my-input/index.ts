/*
 * Secondary entry point for my-input
 * Enables tree-shaking by allowing imports like:
 * import { MyInput } from '@my-lib/my-input';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyInput } from '../../../proxies';
