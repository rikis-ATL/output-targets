import path from 'path';
import type { CompilerCtx, ComponentCompilerMeta, ComponentCompilerProperty, Config } from '@stencil/core/internal';
import type { ComponentInputProperty, OutputTargetAngular, PackageJSON } from './types';
import {
  relativeImport,
  normalizePath,
  sortBy,
  readPackageJson,
  dashToPascalCase,
  createImportStatement,
  isOutputTypeCustomElementsBuild,
  OutputTypes,
  mapPropName,
} from './utils';
import { createAngularComponentDefinition, createComponentTypeDefinition } from './generate-angular-component';
import { generateAngularDirectivesFile } from './generate-angular-directives-file';
import generateValueAccessors from './generate-value-accessors';
import { generateAngularModuleForComponent } from './generate-angular-modules';
import { generateIndividualComponents } from './generate-individual-components';
import { generateSecondaryEntryPoints } from './generate-secondary-entry-points';

export async function angularDirectiveProxyOutput(
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetAngular,
  components: ComponentCompilerMeta[],
  config: Config
) {
  // Angular output target implementation
  
  // Validate standalone configuration if needed
  if (outputTarget.outputType === 'standalone') {
    validateStandaloneConfig(outputTarget, config);
  }

  const filteredComponents = getFilteredComponents(outputTarget.excludeComponents, components);
  const rootDir = config.rootDir as string;
  const pkgData = await readPackageJson(config, rootDir);

  const finalText = generateProxies(filteredComponents, pkgData, outputTarget, config.rootDir as string);

  const baseGenerationPromises = [
    compilerCtx.fs.writeFile(outputTarget.directivesProxyFile, finalText),
    copyResources(config, outputTarget),
    generateAngularDirectivesFile(compilerCtx, filteredComponents, outputTarget),
    generateValueAccessors(compilerCtx, filteredComponents, outputTarget, config),
  ];

  // Generate individual component files for standalone mode (automatic tree-shaking)
  const standalonePromises = outputTarget.outputType === 'standalone'
    ? [
        generateIndividualComponents(compilerCtx, filteredComponents, outputTarget),
        generateSecondaryEntryPoints(compilerCtx, filteredComponents, outputTarget)
      ]
    : [];

  await Promise.all([...baseGenerationPromises, ...standalonePromises]);
}

function getFilteredComponents(excludeComponents: string[] = [], cmps: ComponentCompilerMeta[]) {
  return sortBy(cmps, (cmp) => cmp.tagName).filter((c) => !excludeComponents.includes(c.tagName) && !c.internal);
}

/**
 * Validates the configuration when standalone mode is enabled
 */
function validateStandaloneConfig(outputTarget: OutputTargetAngular, config: Config) {
  // Check if dist-custom-elements output target is configured
  const hasCustomElementsOutput = config.outputTargets?.some(
    (target) => target.type === 'dist-custom-elements'
  );

  if (!hasCustomElementsOutput) {
    throw new Error(
      'Standalone components require a "dist-custom-elements" output target to be configured. ' +
      'Add { type: "dist-custom-elements", customElementsExportBehavior: "single-export-module" } ' +
      'to your outputTargets array in stencil.config.ts'
    );
  }

  // Set default customElementsDir if not provided
  if (!outputTarget.customElementsDir) {
    outputTarget.customElementsDir = 'components';
  }
}

async function copyResources(config: Config, outputTarget: OutputTargetAngular) {
  if (!config.sys || !config.sys.copy || !config.sys.glob) {
    throw new Error('stencil is not properly initialized at this step. Notify the developer');
  }
  // Fix __dirname issue in ES modules
  const currentDir = path.dirname(new URL(import.meta.url).pathname);
  const srcDirectory = path.join(currentDir, '..', 'angular-component-lib');
  const destDirectory = path.join(path.dirname(outputTarget.directivesProxyFile), 'angular-component-lib');

  return config.sys.copy(
    [
      {
        src: srcDirectory,
        dest: destDirectory,
        keepDirStructure: false,
        warn: false,
        ignore: [],
      },
    ],
    srcDirectory
  );
}

export function generateProxies(
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

  /**
   * The collection of named imports from @angular/core.
   */
  const angularCoreImports = ['ChangeDetectionStrategy', 'ChangeDetectorRef', 'Component', 'ElementRef'];

  if (includeOutputImports) {
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

  const imports = `/* tslint:disable */
/* auto-generated angular directive proxies */
${createImportStatement(angularCoreImports, '@angular/core')}

${createImportStatement(componentLibImports, './angular-component-lib/utils')}\n`;
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
    return `import ${isCustomElementsBuild ? 'type ' : ''}{ ${IMPORT_TYPES} } from '${importLocation}';\n`;
  };

  const typeImports = generateTypeImports();

  let sourceImports = '';

  /**
   * Build an array of Custom Elements build imports and namespace them
   * so that they do not conflict with the Angular wrapper names. For example,
   * IonButton would be imported as IonButtonCmp so as to not conflict with the
   * IonButton Angular Component that takes in the Web Component as a parameter.
   * 
   * For standalone builds, skip bulk imports to enable tree-shaking.
   * Individual components will import their own defineCustomElement functions.
   */
  if (isCustomElementsBuild && outputTarget.componentCorePackage !== undefined && !isStandaloneBuild) {
    const cmpImports = components.map((component) => {
      const pascalImport = dashToPascalCase(component.tagName);

      return `import { defineCustomElement as define${pascalImport} } from '${normalizePath(
        outputTarget.componentCorePackage
      )}/${outputTarget.customElementsDir}/${component.tagName}.js';`;
    });

    sourceImports = cmpImports.join('\n');
  }

  const proxyFileOutput = [];

  const filterInternalProps = (prop: { name: string; internal: boolean }) => !prop.internal;

  // Ensure that virtual properties has required as false.
  const mapInputProp = (prop: { name: string; required?: boolean }) => ({
    name: prop.name,
    required: prop.required ?? false,
  });

  const { componentCorePackage, customElementsDir } = outputTarget;

  // For standalone builds, skip generating bulk component definitions in proxies.ts
  // Individual components will be generated separately with their own defineCustomElement imports
  if (!isStandaloneBuild) {
    for (let cmpMeta of components) {
    const tagNameAsPascal = dashToPascalCase(cmpMeta.tagName);

    const internalProps: ComponentCompilerProperty[] = [];

    if (cmpMeta.properties) {
      internalProps.push(...cmpMeta.properties.filter(filterInternalProps));
    }

    const inputs = internalProps.map(mapInputProp);

    if (cmpMeta.virtualProperties) {
      inputs.push(...cmpMeta.virtualProperties.map(mapInputProp));
    }

    const orderedInputs = sortBy(inputs, (cip: ComponentInputProperty) => cip.name);

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
      outputType!,
      tagNameAsPascal,
      cmpMeta.events,
      componentCorePackage,
      customElementsDir
    );

    proxyFileOutput.push(componentDefinition, '\n');
    if (includeSingleComponentAngularModules) {
      proxyFileOutput.push(moduleDefinition, '\n');
    }
    proxyFileOutput.push(componentTypeDefinition, '\n');
    }
  }

  const final: string[] = [imports, typeImports, sourceImports, ...proxyFileOutput];

  return final.join('\n') + '\n';
}

const GENERATED_DTS = 'components.d.ts';
const IMPORT_TYPES = 'Components';
