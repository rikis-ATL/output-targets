import { describe, it, expect } from 'vitest';
import { Config } from '@stencil/core/internal';
import { OutputTargetAngular } from '../src/types';
import { normalizeOutputTarget } from '../src/plugin';

describe('normalizeOutputTarget', () => {
  const config: Config = {
    rootDir: '/dev/',
  };

  it('should return fail if proxiesFile is not set', () => {
    expect(() => {
      normalizeOutputTarget({}, {} as any);
    }).toThrow(new Error('rootDir is not set and it should be set by stencil itself'));
  });

  it('should throw an error if directivesProxyFile is not set', () => {
    expect(() => {
      normalizeOutputTarget(config, {} as any);
    }).toThrow(new Error('directivesProxyFile is required. Please set it in the Stencil config.'));
  });

  it('should return defaults for excludeComponents and valueAccessorConfigs', () => {
    const results: OutputTargetAngular = normalizeOutputTarget(config, {
      directivesProxyFile: '/component-library-angular/src/components.ts',
    } as OutputTargetAngular);

    expect(results.excludeComponents).toEqual([]);
    expect(results.valueAccessorConfigs).toEqual([]);
  });

  it('should default outputType to standalone', () => {
    const results: OutputTargetAngular = normalizeOutputTarget(config, {
      directivesProxyFile: '/component-library-angular/src/components.ts',
    } as OutputTargetAngular);

    expect(results.outputType).toBe('standalone');
  });

  it('should preserve explicitly set outputType', () => {
    const results: OutputTargetAngular = normalizeOutputTarget(config, {
      directivesProxyFile: '/component-library-angular/src/components.ts',
      outputType: 'component',
    } as OutputTargetAngular);

    expect(results.outputType).toBe('component');
  });

  it('should return defaults for outputType', () => {
    const results = normalizeOutputTarget(config, { directivesProxyFile: '' } as OutputTargetAngular);

    expect(results.outputType).toEqual('standalone');
  });

  it('should return defaults for customElementsDir', () => {
    const results = normalizeOutputTarget(config, { directivesProxyFile: '' } as OutputTargetAngular);

    expect(results.customElementsDir).toEqual('components');
  });

  it('should preserve exportIndividualComponents when specified', () => {
    const outputTarget: OutputTargetAngular = {
      directivesProxyFile: 'src/proxies.ts',
      exportIndividualComponents: true,
      outputType: 'standalone'
    };
    
    const results = normalizeOutputTarget(config, outputTarget);

    expect(results.exportIndividualComponents).toBe(true);
  });

  it('should not set exportIndividualComponents when not specified', () => {
    const outputTarget: OutputTargetAngular = {
      directivesProxyFile: 'src/proxies.ts',
      outputType: 'standalone'
    };
    
    const results = normalizeOutputTarget(config, outputTarget);

    expect(results.exportIndividualComponents).toBeUndefined();
  });
});
