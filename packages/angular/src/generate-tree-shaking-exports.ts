import path from 'path';
import type { CompilerCtx, ComponentCompilerMeta } from '@stencil/core/internal';
import type { OutputTargetAngular } from './types';
import { dashToPascalCase } from './utils';

/**
 * Generates a script that creates tree-shaking exports for individual component imports.
 * This script automatically configures package.json subpath exports to enable consumers
 * to import only specific components, dramatically reducing bundle sizes.
 */
export async function generateTreeShakingExportScript(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetAngular
) {
  if (!outputTarget.enableTreeShaking) {
    return;
  }

  const baseDir = path.dirname(outputTarget.directivesProxyFile);
  const scriptsDir = path.join(baseDir, 'scripts');
  const scriptPath = path.join(scriptsDir, 'create-tree-shaking-exports.js');

  // Generate list of components for export
  const componentExports = components
    .map(component => dashToPascalCase(component.tagName))
    .join(', ');

  const scriptContent = `#!/usr/bin/env node

/**
 * Post-build script to create tree-shakable component exports
 * This script creates a secondary entry point for individual component imports
 * Generated automatically by @stencil/angular-output-target
 */

const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist');
const libName = path.basename(distPath);
const componentsPath = path.join(distPath, 'components');

// Create components directory
if (!fs.existsSync(componentsPath)) {
  fs.mkdirSync(componentsPath, { recursive: true });
}

// Create components index.js that re-exports from the main bundle
const componentsIndexJs = \`
// Tree-shakable component exports
// This entry point only includes individual components for optimal bundle sizes
export { ${componentExports} } from '../fesm2022/\${libName}.mjs';
\`;

fs.writeFileSync(path.join(componentsPath, 'index.js'), componentsIndexJs.trim());

// Copy the TypeScript declarations
const srcComponentsDts = path.join(distPath, 'lib', 'components', 'index.d.ts');
const destComponentsDts = path.join(componentsPath, 'index.d.ts');

if (fs.existsSync(srcComponentsDts)) {
  fs.copyFileSync(srcComponentsDts, destComponentsDts);
} else {
  // Fallback: create a simple re-export
  const fallbackDts = \`export { ${componentExports} } from '../lib/components';\`;
  fs.writeFileSync(destComponentsDts, fallbackDts);
}

// Update package.json to include the components export
const packageJsonPath = path.join(distPath, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Add the components export
  packageJson.exports = packageJson.exports || {};
  packageJson.exports['./components'] = {
    "types": "./components/index.d.ts",
    "default": "./components/index.js"
  };

  // Ensure sideEffects is set to false for tree-shaking
  packageJson.sideEffects = false;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

// Tree-shakable components entry point created successfully
// Usage: import { ComponentName } from "your-library/components"`;

  await compilerCtx.fs.writeFile(scriptPath, scriptContent);
}

/**
 * Generates or updates package.json scripts to include the tree-shaking export script
 */
export async function updatePackageJsonForTreeShaking(
  compilerCtx: CompilerCtx,
  outputTarget: OutputTargetAngular
) {
  if (!outputTarget.enableTreeShaking) {
    return;
  }

  const baseDir = path.dirname(outputTarget.directivesProxyFile);
  const packageJsonPath = path.join(baseDir, 'package.json');

  try {
    const packageJsonContent = await compilerCtx.fs.readFile(packageJsonPath);
    const packageJson = JSON.parse(packageJsonContent);

    // Update scripts to include tree-shaking setup
    packageJson.scripts = packageJson.scripts || {};
    
    // Check if build:prod exists, if not, create it
    if (!packageJson.scripts['build:prod']) {
      packageJson.scripts['build:prod'] = 'ng build --configuration production && node scripts/create-tree-shaking-exports.js';
    } else if (!packageJson.scripts['build:prod'].includes('create-tree-shaking-exports')) {
      // Add to existing build:prod script
      packageJson.scripts['build:prod'] += ' && node scripts/create-tree-shaking-exports.js';
    }

    // Ensure sideEffects is set to false
    packageJson.sideEffects = false;

    await compilerCtx.fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  } catch (error) {
    // Package.json might not exist yet, which is fine
    // Note: package.json might not exist yet during initial setup
  }
}
