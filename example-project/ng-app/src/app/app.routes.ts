import { Routes } from '@angular/router';
import { ComponentTests } from './component-tests/component-tests';
import { TreeShakingExample } from './component-tests/tree-shaking-example/tree-shaking-example';

export const routes: Routes = [
  {
    path: '',
    component: ComponentTests,
  },
  {
    path: 'tree-shaking',
    component: TreeShakingExample,
  },
];
