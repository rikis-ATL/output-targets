/*
 * Secondary entry point for my-input-scoped
 * Enables tree-shaking by allowing imports like:
 * import { MyInputScoped } from '@my-lib/my-input-scoped';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyInputScoped } from '../../../proxies';
