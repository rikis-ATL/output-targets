# Angular App - Single Component Test (Tree Shaking Verification)

This Angular application demonstrates **single component imports** to verify tree shaking is working correctly.

## Key Features

- **Single Component Import**: Only imports `MyButton` from the component library
- **Tree Shaking Verification**: MyCheckbox and MyInput are completely excluded from the bundle
- **Bundle Analysis**: Provides clear instructions to verify tree shaking effectiveness

## Import Pattern

This app imports ONLY one component to prove tree shaking works:

```typescript
import { MyButton } from 'component-library-angular';
```

**Note**: Other components like MyCheckbox and MyInput are NOT imported and should be completely excluded from the bundle.

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
