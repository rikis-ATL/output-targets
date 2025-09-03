import path from 'path';
import type { CompilerCtx, ComponentCompilerMeta } from '@stencil/core/internal';
import type { OutputTargetAngular } from './types';
import { dashToPascalCase } from './utils';
import { createAngularComponentDefinition, createComponentTypeDefinition } from './generate-angular-component';

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
  
  // Filter internal properties
  const filterInternalProps = (prop: { name: string; internal: boolean }) => !prop.internal;
  const internalProps = component.properties ? component.properties.filter(filterInternalProps) : [];
  const inputs = internalProps.map(prop => ({ name: prop.name, required: prop.required ?? false }));

  if (component.virtualProperties) {
    inputs.push(...component.virtualProperties.map(prop => ({ name: prop.name, required: false })));
  }

  const methods = component.methods ? component.methods.filter(filterInternalProps).map(method => method.name) : [];
  const inlineComponentProps = outputTarget.inlineProperties ? internalProps : [];

  // Angular imports
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

import { ProxyCmp } from './src/lib/stencil-generated/angular-component-lib/utils';

import type { Components } from '${outputTarget.componentCorePackage}';
import { defineCustomElement${tagNameAsPascal} as define${tagNameAsPascal} } from '${outputTarget.componentCorePackage}/components';`;

  // Event types are handled by the main Components interface
  let eventImports = '';
  if (hasEvents) {
    const eventTypes = component.events?.filter(event => !event.internal).map(event => {
      return `import type { ${event.complexType?.original || 'any'} as I${tagNameAsPascal}${event.name.charAt(0).toUpperCase() + event.name.slice(1)} } from '${outputTarget.componentCorePackage}/components';`;
    }).join('\n') || '';
    
    if (eventTypes) {
      eventImports = '\n' + eventTypes;
    }
  }

  // Generate component definition with standalone: true
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

  return [
    imports,
    eventImports,
    '',
    componentTypeDefinition,
    '',
    componentDefinition
  ].join('\n');
}

/**
 * Generates minimal package.json for ng-packagr secondary entry point discovery.
 * ng-packagr automatically discovers directories with package.json files as secondary entry points.
 */
function generateSecondaryEntryPointPackageJson(): string {
  // Minimal package.json for ng-packagr discovery
  // ng-packagr will automatically treat this directory as a secondary entry point
  const packageJson = {
    "ngPackage": {}
  };
  
  return JSON.stringify(packageJson, null, 2) + '\n';
}