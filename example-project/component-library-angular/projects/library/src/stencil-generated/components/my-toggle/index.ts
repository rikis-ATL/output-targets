/*
 * Secondary entry point for my-toggle
 * Enables tree-shaking by allowing imports like:
 * import { MyToggle } from '@my-lib/my-toggle';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyToggle } from '../../../proxies';
