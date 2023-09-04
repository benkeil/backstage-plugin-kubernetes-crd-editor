import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const kubernetesCrdEditorPlugin = createPlugin({
  id: 'kubernetes-crd-editor',
  routes: {
    root: rootRouteRef,
  },
});

export const KubernetesCrdEditorPage = kubernetesCrdEditorPlugin.provide(
  createRoutableExtension({
    name: 'KubernetesCrdEditorPage',
    component: () =>
      import('./components/CrdEditorComponent').then(m => m.CrdEditorComponent),
    mountPoint: rootRouteRef,
  }),
);
