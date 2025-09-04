/*
 * Secondary entry point for my-button
 * Enables tree-shaking by allowing imports like:
 * import { MyButton } from '@my-lib/my-button';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyButton } from '../../../proxies';
