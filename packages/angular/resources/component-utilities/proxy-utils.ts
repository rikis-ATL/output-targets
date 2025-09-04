/* eslint-disable */
/* tslint:disable */
import { fromEvent } from 'rxjs';

export interface ProxyComponentConstructor<T = any> {
  new (...args: any[]): T;
  prototype: T;
}

export interface ProxyCmpOptions {
  defineCustomElementFn?: () => void;
  inputs?: string[];
  methods?: string[];
}

/**
 * Creates proxy property accessors for Angular component inputs.
 * This enables two-way data binding between Angular and Stencil components.
 * 
 * @param Cmp - The Angular component constructor
 * @param inputs - Array of input property names to proxy
 */
export const proxyInputs = <T>(
  Cmp: ProxyComponentConstructor<T>, 
  inputs: string[]
): void => {
  const Prototype = Cmp.prototype;
  inputs.forEach((item) => {
    Object.defineProperty(Prototype, item, {
      get(this: any) {
        return this.el[item];
      },
      set(this: any, val: unknown) {
        this.z.runOutsideAngular(() => (this.el[item] = val));
      },
      /**
       * In the event that proxyInputs is called
       * multiple times re-defining these inputs
       * will cause an error to be thrown. As a result
       * we set configurable: true to indicate these
       * properties can be changed.
       */
      configurable: true,
    });
  });
};

/**
 * Creates proxy methods that delegate to the underlying Stencil component.
 * Methods are executed outside Angular's zone for better performance.
 * 
 * @param Cmp - The Angular component constructor
 * @param methods - Array of method names to proxy
 */
export const proxyMethods = <T>(
  Cmp: ProxyComponentConstructor<T>, 
  methods: string[]
): void => {
  const Prototype = Cmp.prototype;
  methods.forEach((methodName) => {
    Prototype[methodName] = function (this: any, ...args: unknown[]) {
      return this.z.runOutsideAngular(() => 
        this.el[methodName].apply(this.el, args)
      );
    };
  });
};

/**
 * Creates RxJS observables for Stencil component events.
 * 
 * @param instance - The Angular component instance
 * @param el - The underlying HTML element
 * @param events - Array of event names to create observables for
 */
export const proxyOutputs = (
  instance: any, 
  el: HTMLElement, 
  events: string[]
): void => {
  events.forEach((eventName) => 
    (instance[eventName] = fromEvent(el, eventName))
  );
};

/**
 * Safely defines a custom element if it hasn't been defined already.
 * 
 * @param tagName - The custom element tag name
 * @param customElement - The custom element constructor
 */
export const defineCustomElement = (
  tagName: string, 
  customElement: CustomElementConstructor
): void => {
  if (
    customElement !== undefined && 
    typeof customElements !== 'undefined' && 
    !customElements.get(tagName)
  ) {
    customElements.define(tagName, customElement);
  }
};

/**
 * Decorator that creates an Angular component proxy for Stencil components.
 * Handles inputs, methods, and custom element registration.
 * 
 * @param opts - Configuration options for the proxy component
 * @returns Decorator function for Angular components
 */
export function ProxyCmp(opts: ProxyCmpOptions) {
  return function <T extends ProxyComponentConstructor>(cls: T): T {
    const { defineCustomElementFn, inputs, methods } = opts;

    if (defineCustomElementFn !== undefined) {
      defineCustomElementFn();
    }

    if (inputs) {
      proxyInputs(cls, inputs);
    }
    
    if (methods) {
      proxyMethods(cls, methods);
    }
    
    return cls;
  };
}
