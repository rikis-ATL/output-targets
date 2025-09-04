/*
 * Secondary entry point for my-complex-props-scoped
 * Enables tree-shaking by allowing imports like:
 * import { MyComplexPropsScoped } from '@my-lib/my-complex-props-scoped';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyComplexPropsScoped } from '../../../proxies';
