import path from 'path';
import type { CompilerCtx, ComponentCompilerMeta } from '@stencil/core/internal';
import type { OutputTargetAngular, PackageJSON } from './types';
import {
  relativeImport,
  normalizePath,
  sortBy,
  dashToPascalCase,
  createImportStatement,
  isOutputTypeCustomElementsBuild,
  OutputTypes,
  mapPropName,
} from './utils';
import { createAngularComponentDefinition, createComponentTypeDefinition } from './generate-angular-component';
import { generateAngularModuleForComponent } from './generate-angular-modules';

export async function createAngularIndividualComponents(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  pkgData: PackageJSON,
  outputTarget: OutputTargetAngular,
  rootDir: string
) {
  const distTypesDir = path.dirname(pkgData.types);
  const dtsFilePath = path.join(rootDir, distTypesDir, GENERATED_DTS);
  const { outputType } = outputTarget;
  const componentsTypeFile = relativeImport(outputTarget.directivesProxyFile, dtsFilePath, '.d.ts');
  const includeSingleComponentAngularModules = outputType === OutputTypes.Scam;
  const isCustomElementsBuild = isOutputTypeCustomElementsBuild(outputType!);
  const isStandaloneBuild = outputType === OutputTypes.Standalone;
  const includeOutputImports = components.some((component) => component.events.some((event) => !event.internal));

  // Determine the output directory for individual component files
  const componentOutputPath = outputTarget.componentOutputDir || path.dirname(outputTarget.directivesProxyFile);

  // Create individual component files
  const componentFiles: string[] = [];
  
  for (const cmpMeta of components) {
    const componentFileName = `${cmpMeta.tagName}.ts`;
    const componentFilePath = path.join(componentOutputPath, componentFileName);
    
    componentFiles.push(componentFileName);
    
    const componentFileContent = generateIndividualComponentFile(
      cmpMeta,
      pkgData,
      outputTarget,
      rootDir,
      componentsTypeFile,
      includeSingleComponentAngularModules,
      isCustomElementsBuild,
      isStandaloneBuild,
      includeOutputImports,
      componentOutputPath
    );
    
    await compilerCtx.fs.writeFile(componentFilePath, componentFileContent);
  }
  
  // Create components index file that exports all individual components
  const componentsIndexContent = generateComponentsIndexFile(components, componentFiles);
  const componentsIndexPath = path.join(componentOutputPath, 'components.ts');
  await compilerCtx.fs.writeFile(componentsIndexPath, componentsIndexContent);
  
  return componentFiles;
}

function generateIndividualComponentFile(
  cmpMeta: ComponentCompilerMeta,
  pkgData: PackageJSON,
  outputTarget: OutputTargetAngular,
  rootDir: string,
  componentsTypeFile: string,
  includeSingleComponentAngularModules: boolean,
  isCustomElementsBuild: boolean,
  isStandaloneBuild: boolean,
  includeOutputImports: boolean,
  componentOutputPath: string
): string {
  const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);
  
  /**
   * The collection of named imports from @angular/core.
   */
  const angularCoreImports = ['ChangeDetectionStrategy', 'ChangeDetectorRef', 'Component', 'ElementRef'];

  if (includeOutputImports && cmpMeta.events && cmpMeta.events.some((event) => !event.internal)) {
    angularCoreImports.push('EventEmitter', 'Output');
  }

  angularCoreImports.push('NgZone');

  /**
   * The collection of named imports from the angular-component-lib/utils.
   */
  const componentLibImports = ['ProxyCmp'];

  if (includeSingleComponentAngularModules) {
    angularCoreImports.push('NgModule');
  }

  // Calculate the relative path to angular-component-lib from the component output directory
  // When generateIndividualComponents is true and componentOutputDir is specified,
  // angular-component-lib is copied to the component output directory
  const angularComponentLibPath = outputTarget.generateIndividualComponents && outputTarget.componentOutputDir
    ? './angular-component-lib/utils'  // utils is in the same directory as the components
    : (() => {
        const proxiesDir = path.dirname(outputTarget.directivesProxyFile);
        const relativePath = path.relative(componentOutputPath, proxiesDir);
        return relativePath ? `${relativePath}/angular-component-lib/utils` : './angular-component-lib/utils';
      })();

  const imports = `/* tslint:disable */
/* auto-generated angular directive proxy */
${createImportStatement(angularCoreImports, '@angular/core')}

${createImportStatement(componentLibImports, normalizePath(angularComponentLibPath))}\n`;

  /**
   * Generate JSX import type from correct location.
   * When using custom elements build, we need to import from
   * either the "components" directory or customElementsDir
   * otherwise we risk bundlers pulling in lazy loaded imports.
   */
  const generateTypeImports = () => {
    let importLocation = outputTarget.componentCorePackage
      ? normalizePath(outputTarget.componentCorePackage)
      : normalizePath(componentsTypeFile);
    importLocation += isCustomElementsBuild ? `/${outputTarget.customElementsDir}` : '';
    return `import ${isCustomElementsBuild ? 'type ' : ''}{ Components } from '${importLocation}';\n`;
  };

  const typeImports = generateTypeImports();

  let sourceImports = '';

  /**
   * Build Custom Elements build imports and namespace them
   * so that they do not conflict with the Angular wrapper names.
   */
  if (isCustomElementsBuild && outputTarget.componentCorePackage !== undefined) {
    const pascalImport = dashToPascalCase(cmpMeta.tagName);

    sourceImports = `import { defineCustomElement as define${pascalImport} } from '${normalizePath(
      outputTarget.componentCorePackage
    )}/${outputTarget.customElementsDir}/${cmpMeta.tagName}.js';\n`;
  }

  const filterInternalProps = (prop: { name: string; internal: boolean }) => !prop.internal;

  // Ensure that virtual properties has required as false.
  const mapInputProp = (prop: { name: string; required?: boolean }) => ({
    name: prop.name,
    required: prop.required ?? false,
  });

  const { componentCorePackage, customElementsDir } = outputTarget;

  const internalProps = cmpMeta.properties ? cmpMeta.properties.filter(filterInternalProps) : [];
  const inputs = [...internalProps.map(mapInputProp)];

  if (cmpMeta.virtualProperties) {
    inputs.push(...cmpMeta.virtualProperties.map(mapInputProp));
  }

  const orderedInputs = sortBy(inputs, (cip) => cip.name);

  const methods: string[] = [];
  if (cmpMeta.methods) {
    methods.push(...cmpMeta.methods.filter(filterInternalProps).map(mapPropName));
  }

  const inlineComponentProps = outputTarget.inlineProperties ? internalProps : [];

  /**
   * For each component, we need to generate:
   * 1. The @Component decorated class
   * 2. Optionally the @NgModule decorated class (if includeSingleComponentAngularModules is true)
   * 3. The component interface (using declaration merging for types).
   */
  const componentDefinition = createAngularComponentDefinition(
    cmpMeta.tagName,
    orderedInputs,
    methods,
    isCustomElementsBuild,
    isStandaloneBuild,
    inlineComponentProps,
    cmpMeta.events || []
  );
  
  const moduleDefinition = generateAngularModuleForComponent(cmpMeta.tagName);
  const componentTypeDefinition = createComponentTypeDefinition(
    outputTarget.outputType!,
    tagNameAsPascal,
    cmpMeta.events,
    componentCorePackage,
    customElementsDir
  );

  const componentOutput = [componentDefinition, '\n'];
  if (includeSingleComponentAngularModules) {
    componentOutput.push(moduleDefinition, '\n');
  }
  componentOutput.push(componentTypeDefinition, '\n');

  const final: string[] = [imports, typeImports, sourceImports, ...componentOutput];

  return final.join('\n') + '\n';
}

function generateComponentsIndexFile(components: ComponentCompilerMeta[], componentFiles: string[]): string {
  const autogeneratedComment = `/**
 * This file was automatically generated by the Stencil Angular Output Target.
 * Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
 */

`;

  const disableEslint = `/* eslint-disable */\n`;

  const exports = components.map((component) => {
    const tagNameAsPascal = dashToPascalCase(component.tagName);
    const fileName = component.tagName;
    return `export { ${tagNameAsPascal} } from './${fileName}';`;
  }).join('\n');

  return autogeneratedComment + disableEslint + exports + '\n';
}

const GENERATED_DTS = 'components.d.ts';