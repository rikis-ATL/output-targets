import path from 'path';
import type { CompilerCtx, ComponentCompilerMeta } from '@stencil/core/internal';
import type { OutputTargetAngular } from './types';
import { dashToPascalCase } from './utils';

/**
 * Generates secondary entry points for Angular libraries using the Angular Material pattern.
 * This creates individual entry points like @my-lib/components/button, @my-lib/components/card
 * which enable perfect tree-shaking through ng-packagr's built-in secondary entry point support.
 * 
 * Structure generated (Angular Material style):
 * src/lib/stencil-generated/components/
 * ├── atui-button/
 * │   ├── index.ts        (component export)
 * │   └── package.json    (ng-packagr secondary entry point)
 * └── atui-card/
 *     ├── index.ts        (component export)
 *     └── package.json    (ng-packagr secondary entry point)
 * 
 * This approach:
 * - Uses ng-packagr's official secondary entry point mechanism
 * - Eliminates the need for post-build scripts
 * - Preserves Angular metadata properly during compilation
 * - Follows the same pattern as Angular Material
 */
export async function generateSecondaryEntryPoints(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetAngular
) {
  // Only generate secondary entry points when individual component export is enabled
  if (!outputTarget.individualComponentExport) {
    return;
  }

  // Place secondary entry points at library root level for ng-packagr discovery
  // This follows Angular Material's approach where each component gets its own directory
  // at the library root level, not nested inside src/lib
  const baseDir = path.dirname(outputTarget.directivesProxyFile);
  // baseDir is likely: ../angular-workspace/projects/atui-components/src/lib/stencil-generated
  // We need: ../angular-workspace/projects/atui-components
  const libraryRoot = path.resolve(baseDir, '../../../'); // Go up from src/lib/stencil-generated to project root
  const componentsDir = libraryRoot;

  // Generate secondary entry points for each component
  const entryPointPromises = components.map((component) =>
    generateAngularMaterialStyleEntryPoint(compilerCtx, component, outputTarget, componentsDir)
  );

  await Promise.all(entryPointPromises);
}

/**
 * Generates a single secondary entry point for a component using Angular Material pattern.
 * Creates the directory structure and files for ng-packagr to automatically discover and build.
 */
async function generateAngularMaterialStyleEntryPoint(
  compilerCtx: CompilerCtx,
  component: ComponentCompilerMeta,
  outputTarget: OutputTargetAngular,
  componentsDir: string
) {
  const componentDir = path.join(componentsDir, component.tagName);
  
  // Generate index.ts - the actual component implementation
  const indexPath = path.join(componentDir, 'index.ts');
  const indexContent = await generateComponentImplementation(component, outputTarget);
  
  // Generate package.json for ng-packagr secondary entry point discovery
  const packageJsonPath = path.join(componentDir, 'package.json');
  const packageJsonContent = generateSecondaryEntryPointPackageJson();

  await Promise.all([
    compilerCtx.fs.writeFile(indexPath, indexContent),
    compilerCtx.fs.writeFile(packageJsonPath, packageJsonContent)
  ]);
}

/**
 * Generates the complete component implementation for a secondary entry point.
 * This creates a standalone TypeScript file that ng-packagr can compile properly.
 */
async function generateComponentImplementation(
  component: ComponentCompilerMeta,
  outputTarget: OutputTargetAngular
): Promise<string> {
  const tagNameAsPascal = dashToPascalCase(component.tagName);
  const relPathToProxy = `../src/lib/stencil-generated/components/${component.tagName}`;

  return [
    '/*',
    ` * Secondary entry point for ${component.tagName}`,
    ' * Enables tree-shaking by allowing imports like:',
    ` * import { ${tagNameAsPascal} } from '@my-lib/${component.tagName}';`,
    ' */',
    '',
    `export { ${tagNameAsPascal} } from '${relPathToProxy}';`,
    ''
  ].join('\n');
}

/**
 * Generates minimal package.json for ng-packagr secondary entry point discovery.
 * ng-packagr automatically discovers directories with package.json files as secondary entry points.
 */
function generateSecondaryEntryPointPackageJson(): string {
  // Minimal ng-packagr config for a secondary entry point
  const packageJson = {
    lib: {
      entryFile: 'index.ts'
    }
  };

  return JSON.stringify(packageJson, null, 2) + '\n';
}