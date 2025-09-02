/**
 * The type of output that can be generated with the Angular output target.
 * - `component` - Generate many component wrappers tied to a single Angular module (lazy/hydrated approach).
 * - `scam` - Generate a Single Component Angular Module for each component.
 * - `standalone` - Generates standalone components.
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
   * Experimental (!)
   * When true, tries to inline the properties of components. This is required to enable Angular Language Service
   * to type-check and show jsdocs when using the components in html-templates.
   */
  inlineProperties?: boolean;
  /**
   * Enable tree-shaking support with individual component exports.
   * When true, automatically:
   * - Generates individual component files for optimal bundle sizes
   * - Creates post-build script for package.json subpath exports
   * - Sets up barrel exports for tree-shaking
   * - Enforces standalone components (sets outputType to 'standalone')
   * @default false
   */
  enableTreeShaking?: boolean;
  /**
   * Optional: Custom path for individual component exports when tree-shaking is enabled.
   * Path is relative to the Angular library root.
   * @default './lib/components'
   */
  treeShakingDir?: string;
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
