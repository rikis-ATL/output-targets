import path from 'path';
import type { CompilerCtx, ComponentCompilerMeta } from '@stencil/core/internal';
import type { OutputTargetAngular } from './types';
import { dashToPascalCase, normalizePath } from './utils';
import { createAngularComponentDefinition, createComponentTypeDefinition } from './generate-angular-component';

/**
 * Generates individual component files for tree-shaking support.
 * Each component gets its own file with only the necessary imports to enable
 * optimal bundle sizes when consumers import specific components.
 */
export async function generateIndividualComponents(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetAngular
) {
  if (!outputTarget.enableTreeShaking) {
    return;
  }

  const treeShakingDir = outputTarget.treeShakingDir || './lib/components';
  const baseDir = path.dirname(outputTarget.directivesProxyFile);
  const componentsDir = path.resolve(baseDir, treeShakingDir);

  // Generate individual component files
  const componentPromises = components.map((component) =>
    generateIndividualComponentFile(compilerCtx, component, outputTarget, componentsDir)
  );

  // Generate barrel export file
  const barrelExportPromise = generateBarrelExport(compilerCtx, components, componentsDir);

  await Promise.all([...componentPromises, barrelExportPromise]);
}

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

import { ProxyCmp } from '../stencil-generated/angular-component-lib/utils';

import type { Components } from '${outputTarget.componentCorePackage}/${outputTarget.customElementsDir || 'components'}';`;

  // Add event type imports if needed
  let eventImports = '';
  if (hasEvents) {
    const eventTypes = component.events
      .filter(event => !event.internal)
      .map(event => {
        const eventTypeName = `I${tagNameAsPascal}${dashToPascalCase(event.name)}`;
        return eventTypeName;
      });
    
    if (eventTypes.length > 0) {
      eventImports = `
import type { ${eventTypes.join(', ')} } from '${outputTarget.componentCorePackage}/${outputTarget.customElementsDir || 'components'}';`;
    }
  }

  // Individual defineCustomElement import
  const defineCustomElementImport = `
import { defineCustomElement as define${tagNameAsPascal} } from '${normalizePath(outputTarget.componentCorePackage)}/${outputTarget.customElementsDir || 'components'}/${component.tagName}.js';`;

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
