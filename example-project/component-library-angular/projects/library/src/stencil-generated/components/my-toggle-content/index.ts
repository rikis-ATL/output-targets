/*
 * Secondary entry point for my-toggle-content
 * Enables tree-shaking by allowing imports like:
 * import { MyToggleContent } from '@my-lib/my-toggle-content';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyToggleContent } from '../../../proxies';
