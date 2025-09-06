# Angular App - Old Import Pattern (Traditional)

This Angular application demonstrates the **old/traditional import pattern** for using Stencil components before tree shaking support was added.

## Import Pattern (Before Update)

This app imports components using the traditional approach:

```typescript
import { MyButton, MyCheckbox, MyInput } from 'component-library-angular';
```

### How It Works (Before)
- **Generated Files**: Single `proxies.ts` file containing all components
- **Import Source**: Main package entry point → `proxies.ts`
- **Bundle Behavior**: ALL components are bundled together
- **Tree Shaking**: Not supported

### File Structure (Before)
```
src/directives/
├── proxies.ts            # Single monolithic file with all components
└── index.ts             # DIRECTIVES array
```

## Bundle Impact

### Traditional Pattern Characteristics
- **Bundle Size**: ~270KB (includes ALL components)
- **Tree Shaking**: ❌ Not effective - unused components still included
- **Loading**: All components loaded regardless of usage
- **Performance**: Larger initial bundle, slower loading

### Import Examples
```typescript
// This pattern includes ALL components in the bundle
import { MyButton, MyCheckbox, MyInput } from 'component-library-angular';

// Even if you only use MyButton, MyCheckbox and MyInput are still bundled
import { MyButton } from 'component-library-angular';
```

## Configuration Used
```typescript
// stencil.config.ts (Before update)
angularOutputTarget({
  componentCorePackage: 'component-library',
  directivesProxyFile: '../component-library-angular/projects/library/src/directives/proxies.ts',
  generateIndividualComponents: false, // Traditional approach
})
```

## Building

```bash
npm run build
```

## Comparison

Compare this with `ng-app-individual` to see the difference in bundle sizes and import patterns.

## Development

```bash
npm start
```

Starts the development server on http://localhost:4200
