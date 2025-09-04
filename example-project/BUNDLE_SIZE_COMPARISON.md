# Bundle Size Comparison: Tree-Shaking Benefits

This demonstrates the bundle size benefits of importing only the components you need.

## Apps Overview

### 1. `ng-app` - Legacy Full Import
- **Import Pattern**: `import { MyComponent, MyCounter, MyToggle } from 'component-library-angular'`
- **Components Used**: 3 components + all test components
- **Bundle Size**: 
  - **Raw**: 315.27 kB
  - **Gzipped**: 82.56 kB
  - **Total**: 349.85 kB raw / 93.88 kB gzipped

### 2. `ng-app-tree-shaking` - Selective Import
- **Import Pattern**: `import { MyComponent, MyCounter } from 'component-library-angular'`
- **Components Used**: 2 components only (no test components)
- **Bundle Size**:
  - **Raw**: 220.43 kB
  - **Gzipped**: 62.07 kB  
  - **Total**: 255.01 kB raw / 73.39 kB gzipped

## Bundle Size Reduction

| Metric | Legacy App | Tree-Shaking App | Reduction |
|--------|------------|------------------|-----------|
| Main Bundle (Raw) | 315.27 kB | 220.43 kB | **94.84 kB (-30.1%)** |
| Main Bundle (Gzipped) | 82.56 kB | 62.07 kB | **20.49 kB (-24.8%)** |
| Total Bundle (Raw) | 349.85 kB | 255.01 kB | **94.84 kB (-27.1%)** |
| Total Bundle (Gzipped) | 93.88 kB | 73.39 kB | **20.49 kB (-21.8%)** |

## Key Benefits

1. **Significant Size Reduction**: ~27% smaller bundle when using fewer components
2. **Better Performance**: Faster loading times with smaller bundles
3. **Future-Ready**: As libraries grow, tree-shaking becomes even more valuable

## Import Patterns Supported

```typescript
// Option 1: Legacy bulk import (includes all components)
import { MyComponent, MyCounter, MyToggle } from 'component-library-angular';

// Option 2: Selective import (only imports what you use) - COMING SOON
// import { MyComponent } from 'component-library-angular/components/my-component';
```

## How to Test

```bash
# Build both apps
pnpm --filter "ng-app" build
pnpm --filter "ng-app-tree-shaking" build

# Compare bundle sizes in dist folders
ls -la example-project/ng-app/dist/ng-app/
ls -la example-project/ng-app-tree-shaking/dist/ng-app/
```

## Future Enhancements

The `exportIndividualComponents` configuration enables generation of individual component files that will enable per-component imports like:

```typescript
import { MyButton } from '@my-lib/components/my-button';
```

This will provide even better tree-shaking when the secondary entry points are fully implemented.
