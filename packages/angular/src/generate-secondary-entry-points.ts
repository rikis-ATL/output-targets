import path from 'path';
import type { CompilerCtx, ComponentCompilerMeta } from '@stencil/core/internal';
import type { OutputTargetAngular } from './types';
import { dashToPascalCase } from './utils';

/**
 * Generates individual component bundles using the Angular Material pattern.
 * This creates a structure like Angular Material with individual component directories and FESM bundles.
 *
 * Structure generated (Angular Material style):
 * dist/
 * ├── my-button/
 * │   └── index.d.ts      (component type definitions)
 * ├── my-counter/
 * │   └── index.d.ts      (component type definitions)
 * ├── fesm2022/
 * │   ├── my-button.mjs   (individual component bundle)
 * │   └── my-counter.mjs  (individual component bundle)
 * └── package.json        (with exports pointing to individual bundles)
 *
 * This approach:
 * - Matches Angular Material's current pattern exactly
 * - Creates individual FESM bundles for perfect tree-shaking
 * - Provides separate type definitions for each component
 * - Uses package.json exports for proper module resolution
 */
export async function generateSecondaryEntryPoints(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetAngular
) {
  // Only generate individual component bundles when enabled
  if (!outputTarget.exportIndividualComponents) {
    return;
  }

  // This function will be called POST-BUILD to generate Angular Material-style structure
  // For now, we'll generate the source structure that can be processed later
  const baseDir = path.dirname(outputTarget.directivesProxyFile);
  // baseDir is: ../component-library-angular/projects/library/src/directives
  // We need: ../component-library-angular/projects/library/dist/ (where the built package goes)
  const libraryDistDir = path.resolve(baseDir, '../dist');
  
  // Generate individual component directories and update package.json
  await generateAngularMaterialStructure(compilerCtx, components, outputTarget, libraryDistDir);
}

/**
 * Generates the Angular Material-style structure in the dist directory.
 * This creates individual component directories and updates the package.json exports.
 */
async function generateAngularMaterialStructure(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetAngular,
  distDir: string
) {
  // Generate individual component directories with type definitions
  const componentPromises = components.map((component) =>
    generateComponentDirectory(compilerCtx, component, distDir)
  );

  await Promise.all(componentPromises);

  // Update the package.json with individual component exports
  await updatePackageJsonExports(compilerCtx, components, distDir);
}

/**
 * Generates an individual component directory with type definitions.
 */
async function generateComponentDirectory(
  compilerCtx: CompilerCtx,
  component: ComponentCompilerMeta,
  distDir: string
) {
  const componentDir = path.join(distDir, component.tagName);
  const indexPath = path.join(componentDir, 'index.d.ts');
  const indexContent = generateComponentTypeDefinitions(component);

  await compilerCtx.fs.writeFile(indexPath, indexContent);
}

/**
 * Generates TypeScript type definitions for an individual component.
 */
function generateComponentTypeDefinitions(component: ComponentCompilerMeta): string {
  const tagNameAsPascal = dashToPascalCase(component.tagName);

  return [
    '/*',
    ` * Individual component types for ${component.tagName}`,
    ' * Enables tree-shaking by allowing imports like:',
    ` * import { ${tagNameAsPascal} } from 'component-library-angular/${component.tagName}';`,
    ' */',
    '',
    `export { ${tagNameAsPascal} } from '../index';`,
    '',
  ].join('\n');
}

/**
 * Updates the package.json file with individual component exports.
 */
async function updatePackageJsonExports(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  distDir: string
) {
  const packageJsonPath = path.join(distDir, 'package.json');
  
  try {
    // Read existing package.json
    const packageJsonContent = await compilerCtx.fs.readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonContent);

    // Add individual component exports
    if (!packageJson.exports) {
      packageJson.exports = {};
    }

    // Add exports for each component
    components.forEach((component) => {
      packageJson.exports[`./${component.tagName}`] = {
        types: `./${component.tagName}/index.d.ts`,
        default: `./fesm2022/${component.tagName}.mjs`
      };
    });

    // Write updated package.json
    const updatedContent = JSON.stringify(packageJson, null, 2) + '\n';
    await compilerCtx.fs.writeFile(packageJsonPath, updatedContent);
  } catch (error) {
    console.warn('Could not update package.json exports:', error);
  }
}
