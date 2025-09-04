# Single Source Directory with Path Aliases

## Overview

This document explains how to consolidate component generation into a single source directory while maintaining backwards compatibility and supporting multiple import patterns using TypeScript path aliases.

## The Problem

Previously, the Angular output target generated components in two directories:
- `src/components/` - Tree-shaking individual components (better TypeScript interfaces)
- `src/directives/components/` - Legacy components (missing TypeScript interfaces)

This duplication caused:
- ❌ Code redundancy and maintenance overhead
- ❌ Confusion about which directory to use
- ❌ Inconsistent TypeScript support between approaches

## The Solution: Single Source Directory + Path Aliases

### **Consolidation Strategy**

1. **Keep Only `src/components/`** - The superior implementation with full TypeScript interfaces
2. **Generate Path Alias File** - Create `src/directives/components.ts` that re-exports from `../components`
3. **Use TypeScript Path Mapping** - Configure aliases to support Angular Material-style imports

### **Generated Structure**

```
projects/my-component-lib/src/
├── components/                          # 🎯 Single source of truth
│   ├── my-button.ts                    # Individual component with full TS interfaces
│   ├── my-checkbox.ts                  # Individual component with full TS interfaces
│   └── index.ts                        # Barrel export for multi-component imports
├── directives/
│   ├── components.ts                   # 🔗 Path alias (re-exports from ../components)
│   └── proxies.ts                      # Legacy bulk file (backwards compatibility)
└── public-api.ts                       # Main library export
```

## Import Patterns Supported

### **1. Angular Material Style** (Individual Components)
```typescript
// Direct component import - maximum tree-shaking
import { MyButton } from '@org/my-component-lib/my-button';
import { MyCheckbox } from '@org/my-component-lib/my-checkbox';
```

### **2. Barrel Import** (Multiple Components)
```typescript
// Barrel import - tree-shakable for multiple components
import { MyButton, MyCheckbox } from '@org/my-component-lib/components';
```

### **3. Legacy Import** (Backwards Compatible)
```typescript
// Legacy bulk import - full library (larger bundle)
import { DIRECTIVES } from '@org/my-component-lib';
import { MyButton } from '@org/my-component-lib'; // Via public-api.ts
```

## TypeScript Configuration

### **1. Path Aliases in `tsconfig.json`**

```json
{
  "compilerOptions": {
    "paths": {
      "@org/my-component-lib/*": ["projects/my-component-lib/src/components/*"],
      "@org/my-component-lib/components": ["projects/my-component-lib/src/components/index"],
      "@org/my-component-lib": ["projects/my-component-lib/src/public-api"]
    }
  }
}
```

### **2. Angular Library Configuration**

```typescript
// In your Angular library's public-api.ts
export * from './components'; // Re-export barrel
export { DIRECTIVES } from './directives/proxies'; // Legacy compatibility
```

### **3. ng-packagr Secondary Entry Points**

Update `ng-package.json` to support secondary entry points:

```json
{
  "lib": {
    "entryFile": "src/public-api.ts"
  },
  "allowedNonPeerDependencies": ["tslib"]
}
```

For individual component entry points, create:
```
projects/my-component-lib/my-button/
├── index.ts                            # export { MyButton } from '../src/components/my-button';
└── package.json                        # ng-packagr secondary entry point config
```

## Bundle Size Comparison

| Import Method | Bundle Size | Components Loaded | TypeScript Support |
|---------------|-------------|-------------------|-------------------|
| `@org/lib/my-button` | ~95% smaller | Single component | ✅ Full interfaces |
| `@org/lib/components` | ~70% smaller | Only imported | ✅ Full interfaces |
| `@org/lib` (legacy) | Full library | All components | ⚠️ Basic support |

## Migration Benefits

### **For Library Maintainers**
- ✅ **Single Source of Truth**: Only maintain `src/components/`
- ✅ **Consistent TypeScript**: All components have full interface support
- ✅ **Simplified Build**: No duplicate generation logic
- ✅ **Better Developer Experience**: Clear, predictable structure

### **For Library Consumers**
- ✅ **Backwards Compatibility**: Existing imports continue working
- ✅ **Progressive Enhancement**: Can migrate gradually to tree-shaking imports
- ✅ **Better IntelliSense**: Full TypeScript support across all components
- ✅ **Multiple Import Styles**: Choose based on use case

## Implementation Details

### **Path Alias Generation**

The `generatePathAliasFile` function creates a simple re-export:

```typescript
// Generated src/directives/components.ts
/* Auto-generated path alias for backwards compatibility */
export * from '../components';
```

This allows:
```typescript
// These both work and point to the same components
import { MyButton } from './components/my-button';     // Direct
import { MyButton } from './directives/components';    // Via alias
```

### **Configuration Requirements**

Enable single source directory by setting:

```typescript
angularOutputTarget({
  componentCorePackage: 'my-component-library',
  directivesProxyFile: '../projects/library/src/directives/proxies.ts',
  outputType: 'standalone',
  exportIndividualComponents: true // 👈 Enables single source + aliases
})
```

## Best Practices

### **For New Projects**
1. **Use Individual Imports**: `import { MyButton } from '@org/lib/my-button'`
2. **Configure Path Aliases**: Set up TypeScript paths for clean imports
3. **Leverage Tree-Shaking**: Only import components you actually use

### **For Existing Projects**
1. **No Breaking Changes**: Keep existing imports during migration
2. **Gradual Migration**: Replace imports component by component
3. **Monitor Bundle Size**: Track improvements as you migrate

### **For Library Authors**
1. **Enable Individual Exports**: Set `exportIndividualComponents: true`
2. **Document Import Patterns**: Show examples of all supported patterns
3. **Provide Migration Guide**: Help consumers transition gradually

## Conclusion

The single source directory approach with path aliases provides:

- **🎯 Simplified Architecture**: One source of truth for components
- **🔗 Backwards Compatibility**: Existing code continues working
- **📦 Better Tree-Shaking**: Angular Material-style import patterns
- **🛠️ Enhanced Developer Experience**: Consistent TypeScript support

This approach follows Angular Material's proven pattern while maintaining full backwards compatibility for existing consumers.
