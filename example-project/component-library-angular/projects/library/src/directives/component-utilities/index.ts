/**
 * Angular Component Utilities
 * 
 * This module provides utilities for creating Angular component proxies
 * that wrap Stencil custom elements, enabling seamless integration
 * between Stencil components and Angular applications.
 */

export {
  ProxyCmp,
  proxyInputs,
  proxyMethods,
  proxyOutputs,
  defineCustomElement,
  type ProxyComponentConstructor,
  type ProxyCmpOptions
} from './proxy-utils';
