import { Routes } from '@angular/router';
import { ComponentTests } from './component-tests/component-tests';
import { BundleComparison } from './bundle-comparison/bundle-comparison';

export const routes: Routes = [
  {
    path: '',
    component: BundleComparison,
  },
  {
    path: 'component-tests',
    component: ComponentTests,
  },
  {
    path: 'bundle-comparison',
    component: BundleComparison,
  },
];
