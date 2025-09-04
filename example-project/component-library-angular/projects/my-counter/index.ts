/*
 * Secondary entry point for my-counter
 * Enables tree-shaking by allowing imports like:
 * import { MyCounter } from '@my-lib/my-counter';
 */

export { MyCounter } from '../src/lib/stencil-generated/components/my-counter';
