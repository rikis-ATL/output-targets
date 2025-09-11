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
   * When true, generates individual component files that enable tree shaking.
   * Each component gets its own file and a components.ts file exports all components.
   * This allows bundlers to only include components that are actually imported.
   * When false (default), generates a single monolithic proxy file.
   * 
   * Note: When this is true and outputType is not explicitly set, outputType defaults to 'standalone'.
   * Individual components are generated as standalone Angular components by default.
   */
  generateIndividualComponents?: boolean;
  /**
   * The directory where individual component files should be generated when generateIndividualComponents is true.
   * This can be an absolute path or a path relative to the directivesProxyFile directory.
   * Defaults to the same directory as directivesProxyFile when not specified (backward compatible).
   */
  componentOutputDir?: string;
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
