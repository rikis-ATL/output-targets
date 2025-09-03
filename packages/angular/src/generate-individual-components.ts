import path from 'path';
import type { CompilerCtx, ComponentCompilerMeta } from '@stencil/core/internal';
import type { OutputTargetAngular } from './types';
import { dashToPascalCase } from './utils';
import { createAngularComponentDefinition, createComponentTypeDefinition } from './generate-angular-component';

/**
 * Generates individual component files for standalone components.
 * Each component gets its own file with only the necessary imports to enable
 * optimal bundle sizes when consumers import specific components.
 * This is automatically enabled for standalone output type.
 */
export async function generateIndividualComponents(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetAngular
) {
  // Only generate individual files when individual component export is enabled
  if (!outputTarget.individualComponentExport) {
    return;
  }

  // Generate individual components in a flat structure to avoid ng-packagr conflicts
  const baseDir = path.dirname(outputTarget.directivesProxyFile);
  const componentsDir = path.join(baseDir, 'components');

  // Generate individual component files and barrel export
  const componentPromises = components.map((component) =>
    generateIndividualComponentFile(compilerCtx, component, outputTarget, componentsDir)
  );

  // Generate barrel export for convenience (with tree-shaking caveats)
  const barrelExportPromise = generateBarrelExport(compilerCtx, components, componentsDir);

  // Generate definitions file for individual component imports
  const definitionsPromise = generateDefinitionsFile(compilerCtx, components, outputTarget, componentsDir);

  // Generate individual component files and update package.json exports
  const packageJsonPromise = generatePackageJsonExports(compilerCtx, components, baseDir);
  await Promise.all([...componentPromises, barrelExportPromise, definitionsPromise, packageJsonPromise]);

}

// Generate package.json exports configuration for individual components and tree-shaking
async function generatePackageJsonExports(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  baseDir: string
) {
  // Target the library's package.json, not the output target's
  const libraryPackageJsonPath = path.join(baseDir, '../package.json');

  // Read existing package.json
  let existingPackageJson = {};
  try {
    const existingContent = await compilerCtx.fs.readFile(libraryPackageJsonPath);
    existingPackageJson = JSON.parse(existingContent);
  } catch (e) {
    // File doesn't exist, use empty object
  }

  // Handle existing exports properly - if it exists and is a string, preserve main export
  const existingExports = (existingPackageJson as any).exports;
  let exports: Record<string, any> = {};
  
  // If exports exists and is an object, merge with it
  if (existingExports && typeof existingExports === 'object') {
    exports = { ...existingExports };
  } else if (existingExports && typeof existingExports === 'string') {
    // If it's a string, use it as the main export
    exports["."] = existingExports;
  } else {
    // Default main export - let ng-packagr handle this
    exports["."] = {
      types: "./index.d.ts",
      default: "./fesm2022/alliedtelesis-labs-nz-atui-components-angular.mjs"
    };
  }
  
  // Add components barrel export (ng-packagr will build this as a secondary entry point)
  exports["./components"] = {
    types: "./components/index.d.ts",
    default: "./components/index.js"
  };

  // Add individual component exports for tree-shaking
  components.forEach(component => {
    exports[`./components/${component.tagName}`] = {
      types: `./components/${component.tagName}.d.ts`,
      default: `./components/${component.tagName}.js`
    };
  });

  const updatedPackageJson = {
    ...existingPackageJson,
    sideEffects: false, // Mark as side-effect free for tree-shaking
    exports
  };

  await compilerCtx.fs.writeFile(libraryPackageJsonPath,
    JSON.stringify(updatedPackageJson, null, 2));
}

// Export the function to avoid TS6133 unused warning
export { generatePackageJsonExports };




/**
 * Generates a single component file with only its specific defineCustomElement import.
 * This ensures that when the component is imported, only the necessary code is included
 * in the consumer's bundle, enabling effective tree-shaking.
 */
async function generateIndividualComponentFile(
  compilerCtx: CompilerCtx,
  component: ComponentCompilerMeta,
  outputTarget: OutputTargetAngular,
  componentsDir: string
) {
  const tagNameAsPascal = dashToPascalCase(component.tagName);
  const fileName = `${component.tagName}.ts`;
  const filePath = path.join(componentsDir, fileName);

  // Import statements for Angular
  const angularImports = [
    'ChangeDetectionStrategy',
    'ChangeDetectorRef',
    'Component',
    'ElementRef',
    'NgZone'
  ];

  // Add EventEmitter and Output if component has events
  const hasEvents = component.events && component.events.some(event => !event.internal);
  if (hasEvents) {
    angularImports.push('EventEmitter', 'Output');
  }

  const imports = `/* tslint:disable */
/* auto-generated angular directive proxy for ${component.tagName} */
import { ${angularImports.join(', ')} } from '@angular/core';

import { ProxyCmp } from '../angular-component-lib/utils';

import type { Components } from '${outputTarget.componentCorePackage}';`;

  // Event types are handled by the main Components interface
  let eventImports = '';

  // Individual defineCustomElement import - use relative import from shared definitions
  const defineCustomElementImport = `
import { define${tagNameAsPascal} } from './definitions';`;

  // Filter internal properties
  const filterInternalProps = (prop: { name: string; internal: boolean }) => !prop.internal;

  const internalProps = component.properties ? component.properties.filter(filterInternalProps) : [];
  const inputs = internalProps.map(prop => ({ name: prop.name, required: prop.required ?? false }));

  if (component.virtualProperties) {
    inputs.push(...component.virtualProperties.map(prop => ({ name: prop.name, required: false })));
  }

  const methods = component.methods ? component.methods.filter(filterInternalProps).map(method => method.name) : [];
  const inlineComponentProps = outputTarget.inlineProperties ? internalProps : [];

  // Generate component definition
  const componentDefinition = createAngularComponentDefinition(
    component.tagName,
    inputs,
    methods,
    true, // includeImportCustomElements = true for individual files
    true, // standalone = true for tree-shaking
    inlineComponentProps,
    component.events || []
  );

  // Generate type definition
  const componentTypeDefinition = createComponentTypeDefinition(
    'standalone',
    tagNameAsPascal,
    component.events || [],
    outputTarget.componentCorePackage,
    outputTarget.customElementsDir
  );

  const fileContent = [
    imports,
    eventImports,
    defineCustomElementImport,
    '',
    componentTypeDefinition,
    '',
    componentDefinition
  ].join('\n');

  await compilerCtx.fs.writeFile(filePath, fileContent);
}



/**
 * Generates a definitions file that re-exports all defineCustomElement functions
 * with simplified names for individual component imports
 */
async function generateDefinitionsFile(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetAngular,
  componentsDir: string
) {
  const definitionsPath = path.join(componentsDir, 'definitions.ts');

  const imports = components.map(component => {
    const tagNameAsPascal = dashToPascalCase(component.tagName);
    return `defineCustomElement${tagNameAsPascal} as define${tagNameAsPascal}`;
  });

  const content = [
    '// Re-export defineCustomElement functions for individual component imports',
    '// This file provides a stable import path that works with TypeScript module resolution',
    '',
    `import {`,
    `  ${imports.join(',\n  ')}`,
    `} from '${outputTarget.componentCorePackage}/components';`,
    '',
    ...components.map(component => {
      const tagNameAsPascal = dashToPascalCase(component.tagName);
      return `export { define${tagNameAsPascal} };`;
    })
  ].join('\n');

  await compilerCtx.fs.writeFile(definitionsPath, content);
}

/**
 * Generates the barrel export file (index.ts) that re-exports all individual components
 */
async function generateBarrelExport(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  componentsDir: string
) {
  const indexPath = path.join(componentsDir, 'index.ts');

  const exports = components.map(component => {
    const tagNameAsPascal = dashToPascalCase(component.tagName);
    return `export { ${tagNameAsPascal} } from './${component.tagName}';`;
  });

  const content = [
    '// Individual component exports for tree-shaking',
    '// Each component can be imported individually to avoid loading the entire library',
    '',
    ...exports,
    '',
    '// Add more exports as individual component files are created'
  ].join('\n');

  await compilerCtx.fs.writeFile(indexPath, content);
}
