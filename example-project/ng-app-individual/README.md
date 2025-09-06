# Angular App - Individual Component Import (Tree Shaking)

This Angular application demonstrates **tree-shakable component imports** with the new individual component pattern.

## Import Pattern (After Update)

This app imports ONLY specific components to verify tree shaking works:

```typescript
import { MyButton } from 'component-library-angular';
```

### How It Works (After)
- **Generated Files**: Individual `.ts` files + `components.ts` aggregator
- **Import Source**: Main package → `components.ts` → individual files
- **Bundle Behavior**: ONLY imported components included
- **Tree Shaking**: Fully supported

### File Structure (After)
```
src/directives/
├── my-button.ts          # Individual component file
├── my-checkbox.ts        # Individual component file  
├── my-input.ts           # Individual component file
├── components.ts         # Exports all from individual files
├── proxies.ts           # Re-exports for backward compatibility
└── index.ts             # DIRECTIVES array with individual imports
```

## Tree Shaking Verification

### Single Component Test
This app demonstrates the most effective tree shaking by importing only ONE component:

```typescript
// ONLY MyButton is imported
import { MyButton } from 'component-library-angular';

// These components are NOT imported and should be excluded from bundle:
// MyCheckbox ❌ (should not appear in bundle)
// MyInput ❌ (should not appear in bundle)
```

### Bundle Analysis Results
- **Bundle Size**: ~136KB (contains ONLY MyButton-related code)
- **Tree Shaking**: ✅ MyCheckbox and MyInput completely excluded
- **Verification**: Bundle analysis confirms unused components absent

## Available Import Patterns

The tree shaking pattern supports multiple import approaches:

### Pattern 1: Named Import from Main Package (Used in this app)
```typescript
import { MyButton } from 'component-library-angular';
// ✅ Tree shaking automatic
// ✅ Clean syntax
// ✅ IDE auto-completion
```

### Pattern 2: Direct File Import
```typescript
import { MyButton } from 'component-library-angular/src/directives/my-button';
// ✅ Maximum explicitness
// ✅ Guaranteed tree shaking
```

### Pattern 3: Multiple Component Import
```typescript
import { MyButton, MyInput } from 'component-library-angular';
// ✅ Only imported components included
// ✅ MyCheckbox still excluded
```

## Configuration Used
```typescript
// stencil.config.ts (After update)
angularOutputTarget({
  componentCorePackage: 'component-library',
  directivesProxyFile: '../component-library-angular/projects/library/src/directives/proxies.ts',
  generateIndividualComponents: true, // 🎯 Tree shaking enabled
})
```

## Bundle Verification

To verify tree shaking is working:

1. Build the app: `pnpm build`
2. Inspect the generated bundle files in `dist/`
3. Search for excluded components:
   ```bash
   grep -r "MyCheckbox" dist/ # Should return nothing
   grep -r "MyInput" dist/    # Should return nothing
   grep -r "MyButton" dist/   # Should return matches
   ```

## Bundle Analysis

Generate detailed bundle statistics:
```bash
pnpm run build:stats
```

This creates a `stats.json` file that can be analyzed with webpack-bundle-analyzer.

## Tree Shaking Results

✅ **Verified**: Only MyButton component code is included in the final bundle  
✅ **Verified**: MyCheckbox and MyInput components are completely excluded  
✅ **Bundle Size**: ~136KB main bundle (only includes used components)  

## Building

```bash
pnpm build
```

## Comparison

Compare this with `ng-app-old` to see the difference in bundle sizes and import patterns.

## Development

```bash
pnpm start
```

Starts the development server on http://localhost:4200
