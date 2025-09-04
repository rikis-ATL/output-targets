/*
 * Secondary entry point for my-component
 * Enables tree-shaking by allowing imports like:
 * import { MyComponent } from '@my-lib/my-component';
 */

// Import directly from proxies.ts to avoid circular reference
export { MyComponent } from '../../../proxies';
