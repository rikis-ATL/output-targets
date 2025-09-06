import { describe, expect, it, vi } from 'vitest';
import { generateAngularDirectivesFile } from '../src/generate-angular-directives-file';

describe('generateAngularDirectivesFile', () => {
  it('should generate directives array file with individual imports when generateIndividualComponents is true', async () => {
    const mockCompilerCtx = {
      fs: {
        writeFile: vi.fn().mockResolvedValue(undefined),
      },
    } as any;

    const components = [
      {
        tagName: 'my-component',
        componentClassName: 'MyComponent',
      },
      {
        tagName: 'my-other-component',
        componentClassName: 'MyOtherComponent',
      },
    ] as any;

    const outputTarget = {
      directivesArrayFile: '/path/to/directives/index.ts',
      directivesProxyFile: '/path/to/directives/proxies.ts',
      generateIndividualComponents: true,
    };

    await generateAngularDirectivesFile(mockCompilerCtx, components, outputTarget);

    expect(mockCompilerCtx.fs.writeFile).toHaveBeenCalledWith(
      '/path/to/directives/index.ts',
      expect.stringContaining("import { MyComponent } from './my-component';")
    );

    expect(mockCompilerCtx.fs.writeFile).toHaveBeenCalledWith(
      '/path/to/directives/index.ts',
      expect.stringContaining("import { MyOtherComponent } from './my-other-component';")
    );

    expect(mockCompilerCtx.fs.writeFile).toHaveBeenCalledWith(
      '/path/to/directives/index.ts',
      expect.stringContaining('MyComponent,\n  MyOtherComponent')
    );
  });

  it('should generate directives array file with proxy import when generateIndividualComponents is false', async () => {
    const mockCompilerCtx = {
      fs: {
        writeFile: vi.fn().mockResolvedValue(undefined),
      },
    } as any;

    const components = [
      {
        tagName: 'my-component',
        componentClassName: 'MyComponent',
      },
      {
        tagName: 'my-other-component',
        componentClassName: 'MyOtherComponent',
      },
    ] as any;

    const outputTarget = {
      directivesArrayFile: '/path/to/directives/index.ts',
      directivesProxyFile: '/path/to/directives/proxies.ts',
      generateIndividualComponents: false,
    };

    await generateAngularDirectivesFile(mockCompilerCtx, components, outputTarget);

    expect(mockCompilerCtx.fs.writeFile).toHaveBeenCalledWith(
      '/path/to/directives/index.ts',
      expect.stringContaining("import * as d from './proxies';")
    );

    expect(mockCompilerCtx.fs.writeFile).toHaveBeenCalledWith(
      '/path/to/directives/index.ts',
      expect.stringContaining('d.MyComponent,\n  d.MyOtherComponent')
    );
  });

  it('should not generate file when directivesArrayFile is not defined', async () => {
    const mockCompilerCtx = {
      fs: {
        writeFile: vi.fn().mockResolvedValue(undefined),
      },
    } as any;

    const components = [] as any;
    const outputTarget = {
      directivesProxyFile: '/path/to/directives/proxies.ts',
      generateIndividualComponents: true,
    };

    await generateAngularDirectivesFile(mockCompilerCtx, components, outputTarget);

    expect(mockCompilerCtx.fs.writeFile).not.toHaveBeenCalled();
  });
});