import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';

/**
 * Example Stencil configuration with tree-shaking support for Angular
 * 
 * This example shows how to configure Stencil to generate Angular components
 * with automatic tree-shaking support for optimal bundle sizes.
 */
export const config: Config = {
  namespace: 'my-component-library',
  outputTargets: [
    // REQUIRED: dist-custom-elements for tree-shaking
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
      externalRuntime: false,
    },
    
    // Optional: traditional dist output for non-Angular consumers
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    
    // Angular output target with automatic tree-shaking
    angularOutputTarget({
      componentCorePackage: '@my-company/component-library-stencil',
      directivesProxyFile: '../angular-workspace/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular-workspace/projects/component-library/src/lib/stencil-generated/index.ts',
      
      // 🎯 ENABLE TREE-SHAKING (Automatic with standalone!)
      outputType: 'standalone',
      
      // Optional: Inline properties for better IDE support
      inlineProperties: true,
    }),
  ],
};

/**
 * Usage in Angular applications:
 * 
 * Tree-shaking imports (recommended):
 * import { MyButton, MyCard } from '@my-company/component-library/components';
 * 
 * Legacy bulk imports (backward compatible):
 * import { DIRECTIVES } from '@my-company/component-library';
 */
