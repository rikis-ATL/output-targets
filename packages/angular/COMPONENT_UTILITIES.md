# Component Utilities - Runtime Bridge

This document explains how the Angular component utilities work as a **runtime bridge** between Stencil components and Angular applications.

## What Are These Utilities?

The utilities in `resources/component-utilities/` are **not post-build scripts** but rather **runtime helper functions** that get copied to consumer projects during the Stencil build process. They provide the essential bridge layer that makes Stencil custom elements work seamlessly within Angular applications.

## Build-Time Copy Process

### How It Works

1. **During Stencil Build**: The `copyResources()` function copies utility files from the output target package to the consumer's Angular project
2. **Generated Components Reference Them**: The generated Angular component files import these utilities using relative paths
3. **Runtime Execution**: The utilities handle the bridge between Angular and Stencil at runtime

### Copy Flow

```typescript
// In copyResources function (packages/angular/src/output-angular.ts)
const componentUtilitiesSrc = path.join(__dirname, '..', 'resources', 'component-utilities');
const componentUtilitiesDest = path.join(baseDestDirectory, 'component-utilities');

// Copies files during build:
// FROM: packages/angular/resources/component-utilities/
// TO:   consumer-project/src/lib/component-utilities/
```

## File Structure

```
packages/angular/resources/component-utilities/
├── proxy-utils.ts          # Core proxy utility functions
└── index.ts               # Module exports

# After build, copied to consumer project:
consumer-project/src/lib/component-utilities/
├── proxy-utils.ts          # Same files, copied during build
└── index.ts
```

## Generated Component Usage

When Stencil generates Angular components, they import these utilities:

```typescript
// Generated component file (e.g., my-button.ts)
import { ProxyCmp } from '../component-utilities';

@ProxyCmp({
  defineCustomElementFn: defineMyButton,
  inputs: ['label', 'disabled'],
  methods: ['focus']
})
@Component({
  selector: 'my-button',
  standalone: true,
  template: '<ng-content></ng-content>'
})
export class MyButton {
  // Runtime proxy implementation
}
```

## Runtime Utility Functions

### `ProxyCmp` Decorator
- **Purpose**: Creates Angular component proxy for Stencil components
- **Runtime Job**: Registers custom elements and sets up proxy behaviors
- **When Called**: During Angular component instantiation

### `proxyInputs()`
- **Purpose**: Creates property getters/setters for Angular inputs
- **Runtime Job**: Binds Angular @Input properties to Stencil component properties
- **Performance**: Runs outside Angular zone for better performance

### `proxyMethods()`
- **Purpose**: Creates proxy methods that delegate to Stencil components
- **Runtime Job**: Forwards method calls from Angular to the underlying custom element
- **Performance**: Executes outside Angular zone

### `proxyOutputs()`
- **Purpose**: Creates RxJS observables for Stencil component events
- **Runtime Job**: Converts custom element events to Angular @Output observables
- **Integration**: Uses `fromEvent()` from RxJS

### `defineCustomElement()`
- **Purpose**: Safely registers custom elements
- **Runtime Job**: Ensures custom elements are defined only once
- **Safety**: Checks if element is already registered before defining

## Why This Architecture?

### Benefits of Runtime Utilities

1. **Code Reuse**: Shared utilities across all generated components
2. **Maintainability**: Changes to proxy logic only need to happen in one place
3. **Performance**: Optimized implementations outside Angular's zone
4. **Flexibility**: Can be enhanced without regenerating all components
5. **Tree-Shaking**: Only components that are imported get their utilities

### vs. Inline Generation

Rather than generating all this proxy code inline in every component:
- ✅ **Smaller Bundle Size**: Shared utilities vs. duplicated code
- ✅ **Easier Maintenance**: One place to fix bugs or add features
- ✅ **Better Performance**: Optimized implementations
- ✅ **Type Safety**: Centralized TypeScript interfaces

## Type Safety Features

The utilities include proper TypeScript interfaces:

```typescript
export interface ProxyComponentConstructor<T = any> {
  new (...args: any[]): T;
  prototype: T;
}

export interface ProxyCmpOptions {
  defineCustomElementFn?: () => void;
  inputs?: string[];
  methods?: string[];
}
```

## Clean Code Compliance

The implementation follows SOLID principles:

- ✅ **Single Responsibility**: Each function has one clear purpose
- ✅ **Open/Closed**: Functions are open for extension, closed for modification
- ✅ **Interface Segregation**: Specific interfaces for different concerns
- ✅ **Dependency Inversion**: Proper abstraction with TypeScript interfaces
- ✅ **Separation of Concerns**: Clear boundaries between different functionality

## Integration with Angular Material Pattern

This approach mirrors how Angular Material achieves tree-shaking:
- Individual component imports
- Shared utility functions
- Runtime proxy behaviors
- Optimal bundle sizes

The utilities enable the same level of tree-shaking optimization that Angular Material provides, but for Stencil-generated components.