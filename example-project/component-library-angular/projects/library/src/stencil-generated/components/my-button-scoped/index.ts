/*
 * Secondary entry point for my-button-scoped
 * Enables tree-shaking by allowing imports like:
 * import { MyButtonScoped } from '@my-lib/my-button-scoped';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyButtonScoped } from '../../../proxies';
