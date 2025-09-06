# Angular App - Old Import Pattern

This Angular application demonstrates the **old/traditional import pattern** for using Stencil components.

## Import Pattern

This app imports components from the main package entry point:

```typescript
import { MyButton, MyCheckbox, MyInput } from 'component-library-angular';
```

This approach imports from the monolithic `proxies.ts` file, which bundles ALL components together, preventing effective tree shaking.

## Bundle Impact

- **Imports**: All components are bundled together
- **Tree Shaking**: Not effective - unused components are still included in the bundle
- **Bundle Size**: Larger due to including unused components

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
