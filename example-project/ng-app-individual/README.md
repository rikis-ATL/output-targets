# Angular App - Individual Import Pattern

This Angular application demonstrates the **new individual import pattern** for using Stencil components with tree shaking support.

## Import Pattern

This app imports components from individual component files:

```typescript
import { MyButton } from 'component-library-angular/src/directives/my-button';
import { MyCheckbox } from 'component-library-angular/src/directives/my-checkbox';
import { MyInput } from 'component-library-angular/src/directives/my-input';
```

This approach enables effective tree shaking, where bundlers only include the components that are actually used.

## Bundle Impact

- **Imports**: Only used components are included in the bundle
- **Tree Shaking**: Fully effective - unused components are excluded
- **Bundle Size**: Smaller due to excluding unused components

## Benefits

✅ **Smaller Bundle Sizes**: Only used components are included  
✅ **Better Performance**: Faster loading times  
✅ **Reduced Memory Usage**: Less JavaScript to parse and execute  
✅ **Scalable**: Benefits increase with larger component libraries  

## Building

```bash
npm run build
```

## Comparison

Compare this with `ng-app-old` to see the difference in bundle sizes and import patterns.

## Development

```bash
npm start
```

Starts the development server on http://localhost:4200
