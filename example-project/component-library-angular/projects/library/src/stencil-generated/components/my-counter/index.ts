/*
 * Secondary entry point for my-counter
 * Enables tree-shaking by allowing imports like:
 * import { MyCounter } from '@my-lib/my-counter';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyCounter } from '../../../proxies';
