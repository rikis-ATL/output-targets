import { describe, expect, it, vi } from 'vitest';
import { createAngularIndividualComponents } from '../src/create-angular-individual-components';

describe('createAngularIndividualComponents', () => {
  it('should create individual component files and components index file', async () => {
    const mockCompilerCtx = {
      fs: {
        writeFile: vi.fn().mockResolvedValue(undefined),
      },
    } as any;

    const components = [
      {
        tagName: 'my-component',
        componentClassName: 'MyComponent',
        events: [],
        properties: [],
        methods: [],
      },
      {
        tagName: 'my-other-component', 
        componentClassName: 'MyOtherComponent',
        events: [],
        properties: [],
        methods: [],
      },
    ] as any;

    const pkgData = { types: 'dist/types/components.d.ts' };
    const outputTarget = {
      directivesProxyFile: '/path/to/directives/proxies.ts',
      componentCorePackage: 'component-library',
      customElementsDir: 'components',
      outputType: 'standalone' as const,
      generateIndividualComponents: true,
    };
    const rootDir = '/root';

    await createAngularIndividualComponents(
      mockCompilerCtx,
      components,
      pkgData,
      outputTarget,
      rootDir
    );

    // Verify that writeFile was called multiple times for individual components
    expect(mockCompilerCtx.fs.writeFile).toHaveBeenCalledTimes(3); // 2 components + 1 index file
    
    // Verify individual component files were created with correct paths
    expect(mockCompilerCtx.fs.writeFile).toHaveBeenCalledWith(
      '/path/to/directives/my-component.ts',
      expect.any(String)
    );
    
    expect(mockCompilerCtx.fs.writeFile).toHaveBeenCalledWith(
      '/path/to/directives/my-other-component.ts',
      expect.any(String)
    );

    // Verify components index file was created with both exports
    expect(mockCompilerCtx.fs.writeFile).toHaveBeenCalledWith(
      '/path/to/directives/components.ts',
      expect.stringMatching(/export { MyComponent } from '\.\/my-component';\s*export { MyOtherComponent } from '\.\/my-other-component';/)
    );
  });
});