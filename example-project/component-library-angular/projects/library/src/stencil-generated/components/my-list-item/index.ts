/*
 * Secondary entry point for my-list-item
 * Enables tree-shaking by allowing imports like:
 * import { MyListItem } from '@my-lib/my-list-item';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyListItem } from '../../../proxies';
