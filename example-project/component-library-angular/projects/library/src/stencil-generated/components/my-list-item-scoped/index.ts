/*
 * Secondary entry point for my-list-item-scoped
 * Enables tree-shaking by allowing imports like:
 * import { MyListItemScoped } from '@my-lib/my-list-item-scoped';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyListItemScoped } from '../../../proxies';
