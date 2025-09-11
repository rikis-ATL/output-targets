# Publishing Guide for @rikis-atl/output-targets

This repository contains 4 packages ready for publishing under the `@rikis-atl` namespace:

## Packages

| Package | Version | Status |
|---------|---------|--------|
| `@rikis-atl/angular-output-target` | 1.1.1 | ✅ Ready |
| `@rikis-atl/react-output-target` | 1.2.0 | ✅ Ready |
| `@rikis-atl/vue-output-target` | 0.11.8 | ✅ Ready |
| `@rikis-atl/ssr` | 0.1.1 | ✅ Ready |

## Publishing Commands

To publish all packages:

```bash
# Build all packages
pnpm run build

# Publish individual packages (replace with your npm token)
pnpm publish --filter @rikis-atl/react-output-target --no-git-checks
pnpm publish --filter @rikis-atl/angular-output-target --no-git-checks
pnpm publish --filter @rikis-atl/vue-output-target --no-git-checks
pnpm publish --filter @rikis-atl/ssr --no-git-checks
```

## Testing Installation

After publishing, test the packages can be installed:

```bash
# React
npm install @rikis-atl/react-output-target

# Angular
npm install @rikis-atl/angular-output-target

# Vue
npm install @rikis-atl/vue-output-target

# SSR
npm install @rikis-atl/ssr
```

## Usage

These packages work exactly like the original `@stencil/*` packages, just with the new namespace:

```typescript
// React
import { reactOutputTarget } from '@rikis-atl/react-output-target';

// Angular
import { angularOutputTarget } from '@rikis-atl/angular-output-target';

// Vue
import { vueOutputTarget } from '@rikis-atl/vue-output-target';

// SSR
import { ssrVitePlugin } from '@rikis-atl/ssr/vite';
```

## Verification

All packages have been verified to:
- ✅ Build successfully
- ✅ Pass all unit tests (41 tests total)
- ✅ Package correctly with proper exports
- ✅ Include all necessary files and dependencies