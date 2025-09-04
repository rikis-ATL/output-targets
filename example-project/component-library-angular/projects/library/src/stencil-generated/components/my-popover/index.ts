/*
 * Secondary entry point for my-popover
 * Enables tree-shaking by allowing imports like:
 * import { MyPopover } from '@my-lib/my-popover';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyPopover } from '../../../proxies';
