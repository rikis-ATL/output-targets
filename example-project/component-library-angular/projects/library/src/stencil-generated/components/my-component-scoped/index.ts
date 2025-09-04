/*
 * Secondary entry point for my-component-scoped
 * Enables tree-shaking by allowing imports like:
 * import { MyComponentScoped } from '@my-lib/my-component-scoped';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyComponentScoped } from '../../../proxies';
