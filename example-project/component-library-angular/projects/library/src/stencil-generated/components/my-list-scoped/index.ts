/*
 * Secondary entry point for my-list-scoped
 * Enables tree-shaking by allowing imports like:
 * import { MyListScoped } from '@my-lib/my-list-scoped';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyListScoped } from '../../../proxies';
