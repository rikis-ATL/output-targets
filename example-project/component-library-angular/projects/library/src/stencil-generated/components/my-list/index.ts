/*
 * Secondary entry point for my-list
 * Enables tree-shaking by allowing imports like:
 * import { MyList } from '@my-lib/my-list';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyList } from '../../../proxies';
