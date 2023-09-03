import { kubernetesCrdEditorPlugin } from './plugin';

describe('kubernetes-crd-editor', () => {
  it('should export plugin', () => {
    expect(kubernetesCrdEditorPlugin).toBeDefined();
  });
});
