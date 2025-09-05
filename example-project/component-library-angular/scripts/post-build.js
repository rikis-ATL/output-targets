#!/usr/bin/env node

/**
 * Post-build script to generate Angular Material-style individual component bundles.
 * This runs after ng-packagr builds the main library.
 */

const fs = require('fs').promises;
const path = require('path');

/**
 * Auto-discovers components by reading the main library index.d.ts file
 */
async function discoverComponents() {
  const DIST_DIR = path.resolve(__dirname, '../projects/library/dist');
  const indexDtsPath = path.join(DIST_DIR, 'index.d.ts');
  
  try {
    const indexContent = await fs.readFile(indexDtsPath, 'utf8');
    
    // Extract component names from export declarations like "export { MyComponent, MyButton, ... }"
    const exportMatch = indexContent.match(/export\s*\{\s*([^}]+)\s*\}/);
    if (!exportMatch) {
      console.warn('Could not find export declarations in index.d.ts');
      return [];
    }
    
    const exports = exportMatch[1]
      .split(',')
      .map(name => name.trim())
      .filter(name => name && !name.includes('ValueAccessor') && name !== 'Library') // Filter out non-components
      .map(pascalName => ({
        tagName: pascalToKebab(pascalName),
        pascalName: pascalName
      }));
    
    console.log(`🔍 Auto-discovered ${exports.length} components:`, exports.map(c => c.tagName).join(', '));
    return exports;
    
  } catch (error) {
    console.error('Failed to auto-discover components:', error.message);    
      return [];
  }
}

/**
 * Converts PascalCase to kebab-case (MyComponent -> my-component)
 */
function pascalToKebab(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

const DIST_DIR = path.resolve(__dirname, '../projects/library/dist');

/**
 * Generates individual component directories with type definitions.
 */
async function generateComponentDirectories(components) {
  console.log('Generating individual component directories...');
  
  for (const component of components) {
    const componentDir = path.join(DIST_DIR, component.tagName);
    const indexPath = path.join(componentDir, 'index.d.ts');
    
    // Create component directory
    await fs.mkdir(componentDir, { recursive: true });
    
    // Generate type definitions
    const tagNameAsPascal = component.pascalName;
    const content = [
      '/*',
      ` * Individual component types for ${component.tagName}`,
      ' * Enables tree-shaking by allowing imports like:',
      ` * import { ${tagNameAsPascal} } from 'component-library-angular/${component.tagName}';`,
      ' */',
      '',
      `export { ${tagNameAsPascal} } from '../index';`,
      '',
    ].join('\n');
    
    await fs.writeFile(indexPath, content);
    console.log(`✓ Generated ${component.tagName}/index.d.ts`);
  }
}

/**
 * Updates package.json with individual component exports.
 */
async function updatePackageJsonExports(components) {
  console.log('Updating package.json exports...');
  
  const packageJsonPath = path.join(DIST_DIR, 'package.json');
  
  try {
    // Read existing package.json
    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
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
    await fs.writeFile(packageJsonPath, updatedContent);
    
    console.log('✓ Updated package.json exports');
  } catch (error) {
    console.error('Failed to update package.json:', error);
    process.exit(1);
  }
}

/**
 * Creates individual FESM bundles for each component.
 * For now, these will be simple re-exports from the main bundle.
 */
async function createIndividualBundles(components) {
  console.log('Creating individual FESM bundles...');
  
  const fesmDir = path.join(DIST_DIR, 'fesm2022');
  await fs.mkdir(fesmDir, { recursive: true });
  
  for (const component of components) {
    const bundlePath = path.join(fesmDir, `${component.tagName}.mjs`);
    const tagNameAsPascal = component.pascalName;
    
    // Simple re-export from main bundle
    const content = [
      `// Individual bundle for ${component.tagName}`,
      `export { ${tagNameAsPascal} } from './component-library-angular.mjs';`,
      '',
    ].join('\n');
    
    await fs.writeFile(bundlePath, content);
    console.log(`✓ Generated fesm2022/${component.tagName}.mjs`);
  }
}

// toPascalCase function removed - now using component.pascalName directly

/**
 * Main execution function.
 */
async function main() {
  try {
    console.log('🚀 Starting post-build process for Angular Material-style bundles...');
    
    // Auto-discover components from the built library
    const COMPONENTS = await discoverComponents();
    
    if (COMPONENTS.length === 0) {
      console.warn('⚠️  No components discovered, skipping post-build process');
      return;
    }
    
    await generateComponentDirectories(COMPONENTS);
    await createIndividualBundles(COMPONENTS);
    await updatePackageJsonExports(COMPONENTS);
    
    console.log('✅ Post-build process completed successfully!');
    console.log('');
    console.log('Individual component imports are now available:');
    COMPONENTS.forEach((component) => {
      console.log(`  import { ${component.pascalName} } from 'component-library-angular/${component.tagName}';`);
    });
  } catch (error) {
    console.error('❌ Post-build process failed:', error);
    process.exit(1);
  }
}

main();
