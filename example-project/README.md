# Example Projects

This directory contains example applications demonstrating how to use Stencil output targets across different frameworks.

## 🌳 Angular Tree Shaking Support

The Angular output target now supports tree shaking to reduce bundle sizes by only including components that are actually imported in your application.

### Configuration
Enable tree shaking in your Stencil configuration:

```typescript
angularOutputTarget({
  componentCorePackage: 'component-library',
  directivesProxyFile: '../component-library-angular/projects/library/src/directives/proxies.ts',
  directivesArrayFile: '../component-library-angular/projects/library/src/directives/index.ts',
  generateIndividualComponents: true, // Enable tree shaking
})
```

### Import Patterns

#### Recommended: Named Imports from Main Package
```typescript
import { MyButton, MyInput } from 'component-library-angular';
// Tree-shakable: Only imported components are included in the bundle
```

#### Alternative: Direct File Imports
```typescript
import { MyButton } from 'component-library-angular/src/directives/my-button';
import { MyInput } from 'component-library-angular/src/directives/my-input';
// Explicit imports with guaranteed tree shaking
```

## Framework Examples

- **`component-library/`** - Core Stencil component library
- **`component-library-angular/`** - Angular output target with tree shaking support
- **`component-library-react/`** - React output target example
- **`component-library-vue/`** - Vue output target example
- **`react-app/`** - React example application
- **`vue-app/`** - Vue example application  
- **`next-app/`** - Next.js example application
- **`nuxt-app/`** - Nuxt.js example application

## Tree Shaking Benefits

✅ **Smaller Bundles**: Only used components included  
✅ **Better Performance**: Faster loading times  
✅ **Scalable**: Benefits increase with library size  
✅ **Modern**: Follows current bundling best practices  
✅ **Backward Compatible**: Existing imports work unchanged

## Getting Started

1. **Build the component library:**
   ```bash
   cd component-library
   npm run build
   ```

2. **Build the Angular wrapper:**
   ```bash
   cd component-library-angular
   npm run build
   ```

3. **Run example applications:**
   ```bash
   # React example
   cd react-app && npm start
   
   # Vue example  
   cd vue-app && npm run dev
   
   # Next.js example
   cd next-app && npm run dev
   ```

## Documentation

For detailed information about tree shaking in Angular, see:
- **`packages/angular/TREE_SHAKING_GUIDE.md`** - Comprehensive migration guide
- **`packages/angular/README.md`** - Configuration options and usage

## Development

Each example can be run independently for development and testing. See individual README files in each directory for specific instructions.