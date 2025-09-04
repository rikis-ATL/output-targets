/*
 * Secondary entry point for my-range
 * Enables tree-shaking by allowing imports like:
 * import { MyRange } from '@my-lib/my-range';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyRange } from '../../../proxies';
