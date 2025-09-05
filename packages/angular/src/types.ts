/**
 * The type of output that can be generated with the Angular output target.
 * - `component` - Generate many component wrappers tied to a single Angular module (lazy/hydrated approach).
 * - `scam` - Generate a Single Component Angular Module for each component.
 * - `standalone` - Generates standalone components with automatic tree-shaking support.
 */
export type OutputType = 'component' | 'scam' | 'standalone';

export interface OutputTargetAngular {
  /**
   * The package name of the component library.
   * This is used to generate the import statements.
   */
  componentCorePackage: string;
  /**
   * The path to the proxy file that will be generated. This can be an absolute path
   * or a relative path from the root directory of the Stencil library.
   */
  directivesProxyFile: string;
  directivesArrayFile?: string;
  valueAccessorConfigs?: ValueAccessorConfig[];
  excludeComponents?: string[];
  customElementsDir?: string;
  /**
   * The type of output that should be generated.
   * - `component` - Generate many component wrappers tied to a single Angular module (lazy/hydrated approach).
   * - `scam` - Generate a Single Component Angular Module for each component.
   * - `standalone` - (default) Generates standalone components.
   */
  outputType?: OutputType;
  /**
   * When true, generates individual component files for optimal tree-shaking.
   * This enables imports like: import { MyButton } from '@my-lib/components/my-button'
   *
   * REQUIREMENTS:
   * - Only works with outputType: 'standalone'
   * - Provides better TypeScript interface support than legacy bulk approach
   *
   * BENEFITS:
   * - Enables tree-shaking for optimal bundle sizes
   * - Better TypeScript IntelliSense and type checking
   * - Component-level imports for maximum optimization
   *
   * @default false
   */
  // exportIndividualComponents removed - now handled by post-build script
  /**
   * Experimental (!)
   * When true, tries to inline the properties of components. This is required to enable Angular Language Service
   * to type-check and show jsdocs when using the components in html-templates.
   */
  inlineProperties?: boolean;
}

export type ValueAccessorTypes = 'text' | 'radio' | 'select' | 'number' | 'boolean';

export interface ValueAccessorConfig {
  elementSelectors: string | string[];
  event: string;
  targetAttr: string;
  type: ValueAccessorTypes;
}

export interface PackageJSON {
  types: string;
}

export interface ComponentInputProperty {
  name: string;
  required: boolean;
}
