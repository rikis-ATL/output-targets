# Legacy vs Individual Component Exports: Feature Comparison

## Overview

The Angular output target supports two component generation strategies with different capabilities and trade-offs.

## Feature Comparison

| Feature | Legacy Bulk Export | Individual Component Export |
|---------|-------------------|----------------------------|
| **File Structure** | Single `proxies.ts` file | One file per component |
| **Bundle Size** | Full library included | Tree-shakable imports |
| **TypeScript Interfaces** | ❌ Missing | ✅ Full interface support |
| **IntelliSense** | Basic | Enhanced with proper types |
| **Import Patterns** | `import { DIRECTIVES }` | `import { MyButton } from './my-button'` |
| **Backwards Compatibility** | ✅ Full compatibility | ✅ Additive, non-breaking |
| **Configuration** | Always generated | `exportIndividualComponents: true` |

## Configuration

Enable individual component exports:

```typescript
angularOutputTarget({
  componentCorePackage: 'my-component-library',
  directivesProxyFile: '../projects/library/src/directives/proxies.ts',
  outputType: 'standalone', // Required
  exportIndividualComponents: true // 👈 Add this
})
```

## Known Limitations

### Legacy Bulk Export Limitations

1. **Missing TypeScript Interface Declarations**
   ```typescript
   // ❌ NOT generated in bulk export
   export declare interface MyComponent extends Components.MyComponent {}
   ```

2. **Bundle Size Impact**
   - Importing one component includes the entire library
   - No tree-shaking benefits
   - Larger JavaScript bundles

3. **Limited Type Safety**
   - Less precise TypeScript support
   - Reduced IntelliSense capabilities
   - Missing component interface extensions

### Individual Export Advantages

1. **Complete TypeScript Support**
   ```typescript
   // ✅ Generated in individual exports
   export declare interface MyComponent extends Components.MyComponent {}
   ```

2. **Optimal Tree-Shaking**
   - Only imported components included in bundle
   - 60-90% smaller bundle sizes
   - Better runtime performance

3. **Enhanced Developer Experience**
   - Full IntelliSense support
   - Better error checking
   - Component-specific type information

## Import Patterns

### Tree-Shaking Imports (Recommended)
```typescript
// Barrel import - multiple components, tree-shakable
import { ComponentOne, ComponentTwo } from '@my-lib/components';

// Individual import - single component, maximum tree-shaking  
import { ComponentOne } from '@my-lib/components/component-one';
```

### Legacy Imports (Backwards Compatible)
```typescript
// Bulk import - all components (larger bundle)
import { DIRECTIVES } from '@my-lib';

// Direct component import from main package
import { ComponentOne } from '@my-lib';
```

## Bundle Size Impact

| Import Method | Components Loaded | Bundle Size | Use Case |
|---------------|-------------------|-------------|----------|
| **Tree-shaking Individual** | Only imported | ~90% smaller | New projects, performance-critical apps |
| **Tree-shaking Barrel** | Only imported | ~70% smaller | Multiple components needed |
| **Legacy Bulk** | All components | Full library size | Existing projects, migration phase |

## Migration Recommendation

For new projects or when optimizing existing ones:

1. **Enable Individual Exports**:
   ```typescript
   angularOutputTarget({
     outputType: 'standalone',
     exportIndividualComponents: true
   })
   ```

2. **Gradual Migration**:
   ```typescript
   // Legacy (still works)
   import { DIRECTIVES } from '@my-lib';
   
   // Modern (better performance + types)
   import { MyButton } from '@my-lib/components/my-button';
   ```

3. **Best Practices**:
   - Use individual imports for new features
   - Migrate critical paths for performance
   - Keep legacy imports for compatibility

## Requirements

- **outputType: 'standalone'** - Individual exports only work with standalone components
- **dist-custom-elements output target** - Required for tree-shaking support

## Error Messages

If you see these errors, here's how to fix them:

### "exportIndividualComponents can only be used with outputType: 'standalone'"
```typescript
// Fix: Ensure outputType is set to standalone
angularOutputTarget({
  outputType: 'standalone', // 👈 Required
  exportIndividualComponents: true
})
```

### "exportIndividualComponents requires a 'dist-custom-elements' output target"
```typescript
// Fix: Add dist-custom-elements to your Stencil config
export const config: Config = {
  outputTargets: [
    {
      type: 'dist-custom-elements', // 👈 Required
      customElementsExportBehavior: 'single-export-module'
    },
    angularOutputTarget({
      exportIndividualComponents: true
    })
  ]
};
```

This resolves the TypeScript interface limitation while maintaining full backwards compatibility.
