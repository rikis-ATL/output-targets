import path from 'path';
import type { OutputTargetAngular } from './types';
import { dashToPascalCase, relativeImport } from './utils';
import type { CompilerCtx, ComponentCompilerMeta } from '@stencil/core/internal';

export function generateAngularDirectivesFile(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetAngular
): Promise<any> {
  // Only create the file if it is defined in the stencil configuration
  if (!outputTarget.directivesArrayFile) {
    return Promise.resolve();
  }

  let directives: string;
  let imports: string;

  if (outputTarget.generateIndividualComponents) {
    // When using individual components, import each component from its own file
    const componentOutputPath = outputTarget.componentOutputDir || path.dirname(outputTarget.directivesProxyFile);
    const componentImports = components
      .map((cmpMeta) => {
        const className = dashToPascalCase(cmpMeta.tagName);
        const componentFile = relativeImport(outputTarget.directivesArrayFile!, `${componentOutputPath}/${cmpMeta.tagName}.ts`, '.ts');
        return `import { ${className} } from '${componentFile}';`;
      })
      .join('\n');
    
    imports = componentImports;
    directives = components
      .map((cmpMeta) => dashToPascalCase(cmpMeta.tagName))
      .join(',\n  ');
  } else {
    // Original behavior: import all components from the proxy file
    const proxyPath = relativeImport(outputTarget.directivesArrayFile, outputTarget.directivesProxyFile, '.ts');
    imports = `import * as d from '${proxyPath}';`;
    directives = components
      .map((cmpMeta) => dashToPascalCase(cmpMeta.tagName))
      .map((className) => `d.${className}`)
      .join(',\n  ');
  }

  const c = `
${imports}

export const DIRECTIVES = [
  ${directives}
];
`;
  return compilerCtx.fs.writeFile(outputTarget.directivesArrayFile, c);
}
