# Example Project - Angular Tree Shaking Comparison

This directory contains example applications demonstrating the difference between traditional and tree-shakable import patterns for Angular Stencil components.

## 🌳 Tree Shaking Import Patterns Comparison

### Before Update (Traditional Pattern)
- **Pattern**: Import from monolithic file
- **Configuration**: `generateIndividualComponents: false` (default)
- **Bundle**: All components included regardless of usage
- **Tree Shaking**: Not supported

### After Update (Tree Shaking Pattern)  
- **Pattern**: Import from individual files or main package with tree shaking
- **Configuration**: `generateIndividualComponents: true`
- **Bundle**: Only imported components included
- **Tree Shaking**: Fully supported

## Import Pattern Examples

### Traditional Pattern (Before)
```typescript
// ng-app-old example
import { MyButton, MyCheckbox, MyInput } from 'component-library-angular';
// Result: ALL components bundled together (~270KB)
```

### Tree Shaking Pattern (After)
```typescript
// ng-app-individual example - Option 1 (Recommended)
import { MyButton } from 'component-library-angular';
// Result: Only MyButton included in bundle (~136KB)

// Option 2 - Direct file imports
import { MyButton } from 'component-library-angular/src/directives/my-button';
// Result: Only MyButton included in bundle (~136KB)

// Option 3 - Mixed imports (gradual migration)
import { MyButton, MyCheckbox } from 'component-library-angular';
import { MyInput } from 'component-library-angular/src/directives/my-input';
// Result: Only imported components included
```

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

## Import Pattern Comparison Table

| Feature | Traditional Pattern | Tree Shaking Pattern |
|---------|-------------------|---------------------|
| **Configuration** | `generateIndividualComponents: false` | `generateIndividualComponents: true` |
| **Import Syntax** | `import { MyButton } from 'library'` | `import { MyButton } from 'library'` ✅ Same! |
| **Alternative Import** | Not available | `import { MyButton } from 'library/src/directives/my-button'` |
| **Generated Files** | `proxies.ts` (monolithic) | Individual `.ts` files + `components.ts` |
| **Bundle Size** | All components included | Only used components |
| **Tree Shaking** | ❌ Not supported | ✅ Fully supported |
| **Backward Compatibility** | N/A | ✅ 100% compatible |
| **Migration Required** | N/A | ❌ No changes needed |

## Use Cases and Recommendations

### When to Use Traditional Pattern
- ✅ **Small component libraries** (< 10 components)
- ✅ **Applications using most components** (> 80% usage)
- ✅ **Prototyping and development** (simplicity preferred)
- ✅ **Legacy projects** (minimal changes required)

### When to Use Tree Shaking Pattern
- ✅ **Large component libraries** (20+ components)
- ✅ **Applications using few components** (< 50% usage)
- ✅ **Production optimization** (bundle size critical)
- ✅ **Modern development** (best practices)
- ✅ **Micro-frontends** (component isolation)

### Migration Scenarios

#### Scenario 1: New Project
```typescript
// Recommended approach for new projects
angularOutputTarget({
  generateIndividualComponents: true, // Enable from start
})

// Use standard imports - tree shaking automatic
import { MyButton, MyInput } from 'component-library-angular';
```

#### Scenario 2: Existing Project (Zero Changes)
```typescript
// Enable tree shaking without changing any imports
angularOutputTarget({
  generateIndividualComponents: true, // Just enable this
})

// Existing imports automatically benefit from tree shaking
import { MyButton, MyCheckbox } from 'component-library-angular';
```

#### Scenario 3: Maximum Optimization
```typescript
// For applications needing smallest possible bundles
angularOutputTarget({
  generateIndividualComponents: true,
})

// Import only what you need
import { MyButton } from 'component-library-angular';
// MyCheckbox, MyInput, etc. completely excluded from bundle
```

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