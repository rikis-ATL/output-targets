import path from 'path';
import type { CompilerCtx, ComponentCompilerMeta } from '@stencil/core/internal';
import type { OutputTargetAngular } from './types';
import { dashToPascalCase } from './utils';

/**
 * Generates secondary entry points for Angular libraries.
 * This creates individual entry points like @my-lib/button, @my-lib/card
 * which enable better tree-shaking and allow consumers to import specific components.
 * 
 * Structure generated:
 * src/lib/stencil-generated/components/
 * ├── atui-button/
 * │   ├── index.ts
 * │   ├── package.json  
 * │   └── ng-package.json
 * └── atui-card/
 *     ├── index.ts
 *     ├── package.json
 *     └── ng-package.json
 */
export async function generateSecondaryEntryPoints(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetAngular
) {
  // Only generate secondary entry points for standalone components
  if (outputTarget.outputType !== 'standalone') {
    return;
  }

  const baseDir = path.dirname(outputTarget.directivesProxyFile);
  const entryPointsDir = path.resolve(baseDir, 'stencil-generated', 'components');

  // Generate secondary entry points for each component
  const entryPointPromises = components.map((component) =>
    generateSecondaryEntryPoint(compilerCtx, component, outputTarget, entryPointsDir)
  );

  await Promise.all(entryPointPromises);
}

/**
 * Generates a single secondary entry point for a component.
 * Creates the directory structure and necessary files for ng-packagr to build
 * individual entry points.
 */
async function generateSecondaryEntryPoint(
  compilerCtx: CompilerCtx,
  component: ComponentCompilerMeta,
  outputTarget: OutputTargetAngular,
  entryPointsDir: string
) {
  const tagNameAsPascal = dashToPascalCase(component.tagName);
  const componentDir = path.join(entryPointsDir, component.tagName);
  
  // Generate index.ts - entry point file
  const indexPath = path.join(componentDir, 'index.ts');
  const indexContent = generateEntryPointIndex(component, tagNameAsPascal);
  
  // Generate package.json for the entry point
  const packageJsonPath = path.join(componentDir, 'package.json');
  const packageJsonContent = generateEntryPointPackageJson(component.tagName);
  
  // Generate ng-package.json for ng-packagr
  const ngPackagePath = path.join(componentDir, 'ng-package.json');
  const ngPackageContent = generateEntryPointNgPackage();

  await Promise.all([
    compilerCtx.fs.writeFile(indexPath, indexContent),
    compilerCtx.fs.writeFile(packageJsonPath, packageJsonContent),
    compilerCtx.fs.writeFile(ngPackagePath, ngPackageContent)
  ]);
}

/**
 * Generates the index.ts file for a secondary entry point.
 * This file re-exports the component from the main components directory.
 */
function generateEntryPointIndex(component: ComponentCompilerMeta, componentName: string): string {
  return `/*
 * Secondary entry point for ${component.tagName}
 * Enables tree-shaking by allowing imports like:
 * import { ${componentName} } from '@my-lib/${component.tagName}';
 */

export { ${componentName} } from '../../components/${component.tagName}';
`;
}

/**
 * Generates package.json for a secondary entry point.
 * This tells Angular's build system where to find the entry point.
 */
function generateEntryPointPackageJson(tagName: string): string {
  const packageJson = {
    ngPackage: {}
  };
  
  return JSON.stringify(packageJson, null, 2) + '\n';
}

/**
 * Generates ng-package.json for a secondary entry point.
 * This configures ng-packagr to build this as a separate entry point.
 */
function generateEntryPointNgPackage(): string {
  const ngPackage = {
    lib: {
      entryFile: "index.ts"
    }
  };
  
  return JSON.stringify(ngPackage, null, 2) + '\n';
}