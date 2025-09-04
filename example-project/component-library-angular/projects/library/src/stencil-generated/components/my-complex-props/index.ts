/*
 * Secondary entry point for my-complex-props
 * Enables tree-shaking by allowing imports like:
 * import { MyComplexProps } from '@my-lib/my-complex-props';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyComplexProps } from '../../../proxies';
