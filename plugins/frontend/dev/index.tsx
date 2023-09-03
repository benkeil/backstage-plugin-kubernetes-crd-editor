import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { KubernetesCrdEditorPage, kubernetesCrdEditorPlugin } from '../src';

createDevApp()
  .registerPlugin(kubernetesCrdEditorPlugin)
  .addPage({
    element: <KubernetesCrdEditorPage />,
    title: 'Root Page',
    path: '/kubernetes-crd-editor',
  })
  .render();
