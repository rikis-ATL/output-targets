# Angular Tree Shaking Bundle Analysis

This directory contains tools and test applications to demonstrate and verify tree shaking functionality in the Angular output target.

## Features Implemented

✅ **Individual Component Generation**: Each component gets its own `.ts` file  
✅ **Tree Shaking Support**: Components can be imported individually for better bundle optimization  
✅ **Backward Compatibility**: Existing imports continue to work through re-export proxy  
✅ **Bundle Analysis Tools**: Automated scripts to compare bundle sizes  

## Quick Start

1. **Build the component library** (if not already built):
   ```bash
   cd ../component-library
   pnpm build
   ```

2. **Test tree shaking performance**:
   ```bash
   npm run test-tree-shaking
   ```

3. **Run individual tests**:
   ```bash
   # Build individual import version
   npm run build:individual
   
   # Build bulk import version  
   npm run build:bulk
   
   # Analyze and compare bundle sizes
   npm run analyze-bundles
   ```

## Bundle Analysis Results

The bundle analyzer compares two build configurations:

### Individual Import Build
- **Entry Point**: `src/main-individual.ts`
- **Component Usage**: Imports only 3 specific components
- **Build Output**: `dist/ng-app-individual/`

### Bulk Import Build  
- **Entry Point**: `src/main-bulk.ts`
- **Component Usage**: Imports all 14+ components from main package
- **Build Output**: `dist/ng-app-bulk/`

### Current Results
```
📦 Individual Import Bundle: 267.5 KB (main: 233.73 KB)
📦 Bulk Import Bundle: 267.84 KB (main: 234.07 KB)
✅ Tree shaking saved: 350 Bytes (0.1%)
```

## Tree Shaking Implementation

### Generated Structure
```
component-library-angular/projects/library/src/directives/
├── my-button.ts           # Individual component
├── my-checkbox.ts         # Individual component  
├── my-input.ts           # Individual component
├── components.ts         # Exports all components
├── proxies.ts           # Re-exports for compatibility
└── index.ts             # DIRECTIVES array
```

### Import Strategies

**Tree-shakable imports** (individual components):
```typescript
import { MyButton } from 'component-library-angular';
// Only MyButton is bundled
```

**Bulk imports** (all components):
```typescript  
import { 
  MyButton, MyCheckbox, MyInput, MyComponent, 
  MyCounter, MyList, MyPopover, /* ... all components */ 
} from 'component-library-angular';
// All components bundled even if not used
```

## Usage in Applications

To enable tree shaking in your Angular app:

1. **Use selective imports**:
   ```typescript
   import { MyButton, MyInput } from 'component-library-angular';
   ```

2. **Configure bundle analyzer** in your project:
   ```bash
   npm install --save-dev webpack-bundle-analyzer
   ```

3. **Analyze your bundles**:
   ```bash
   ng build --stats-json
   npx webpack-bundle-analyzer dist/your-app/stats.json
   ```

## Development

### Scripts Available

- `npm run test-tree-shaking` - Complete tree shaking test and analysis
- `npm run build:individual` - Build with individual component imports
- `npm run build:bulk` - Build with bulk component imports  
- `npm run analyze-bundles` - Compare and analyze bundle sizes
- `npm run bundle-report` - Generate detailed webpack bundle report

### Files Structure

- **Test Components**:
  - `src/app/individual-import-test/` - Uses only specific components
  - `src/app/bulk-import-test/` - Imports all components
  - `src/app/bundle-comparison/` - Interactive comparison view

- **Build Configurations**:
  - `src/main-individual.ts` - Individual import entry point
  - `src/main-bulk.ts` - Bulk import entry point
  - `angular.json` - Build configurations for both strategies

- **Analysis Tools**:
  - `analyze-bundles.js` - Bundle size comparison script
  - `package.json` - Build and analysis scripts

## Expected Results

Tree shaking provides significant benefits when:

1. **Large Component Libraries**: More components = greater potential savings
2. **Selective Usage**: Apps using only a subset of available components
3. **Production Builds**: Optimization enabled with proper tree shaking configuration

The current test shows minimal savings because both test apps use similar components, but real-world applications with large component libraries and selective usage will see much larger benefits.

## Next Steps

- [ ] Add more comprehensive component usage examples
- [ ] Test with larger component libraries  
- [ ] Measure performance impact of tree shaking
- [ ] Add integration with popular bundlers (webpack, esbuild, etc.)

---

# Angular CLI Project Information

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.
