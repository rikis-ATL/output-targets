# Example Project - Angular Tree Shaking Comparison

This directory contains example applications demonstrating the difference between traditional and tree-shakable import patterns for Angular Stencil components.

## Applications

### 🌳 Angular Tree Shaking Examples

- **`ng-app-old/`** - Traditional import pattern (from main package)
- **`ng-app-individual/`** - Individual import pattern (tree shaking enabled)
- **`ng-app/`** - Bundle analysis tools and comprehensive testing

### Other Framework Examples

- **`react-app/`** - React example application
- **`vue-app/`** - Vue example application  
- **`next-app/`** - Next.js example application
- And more...

## Quick Comparison

Compare Angular tree shaking effectiveness by running:

```bash
./compare-angular-bundles.sh
```

This script builds both Angular apps and shows bundle size differences.

## Individual App Usage

### Traditional Pattern (ng-app-old)
```bash
cd ng-app-old
npm install
npm start
```
Import pattern: `import { MyButton } from 'component-library-angular'`

### Individual Pattern (ng-app-individual)  
```bash
cd ng-app-individual
npm install  
npm start
```
Import pattern: `import { MyButton } from 'component-library-angular/src/directives/my-button'`

## Bundle Analysis

### Tree Shaking Benefits

✅ **Smaller Bundles**: Only used components included  
✅ **Better Performance**: Faster loading times  
✅ **Scalable**: Benefits increase with library size  
✅ **Modern**: Follows current bundling best practices  

### When You'll See Big Savings

- Large component libraries (50+ components)
- Apps using only a subset of components (10-20%)
- Production builds with optimization enabled
- Modern bundlers (webpack 5+, Rollup, esbuild)

## Component Library

The example apps use components from:
- **`component-library/`** - Core Stencil components
- **`component-library-angular/`** - Angular output target

Make sure to build the component library first:

```bash
cd component-library
pnpm build
```

## Development

Each app can be run independently for development and testing. See individual README files in each app directory for specific instructions.