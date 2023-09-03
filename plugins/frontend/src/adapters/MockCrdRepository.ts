import { CrdRepository } from '../domain/repositories/CrdRepository';
import { load } from 'js-yaml';
import { CustomResourceDefinition } from '../domain/data/CustomResourceDefinition';

const data = `
# Generated by Fabric8 CRDGenerator, manual edits might get overwritten!
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  labels:
    provider: test.platform.otto.de
  name: sqsqueues.test.platform.otto.de
spec:
  group: test.platform.otto.de
  names:
    kind: SqsQueue
    plural: sqsqueues
    shortNames:
    - queue
    - sqs
    singular: sqsqueue
  scope: Namespaced
  versions:
  - name: v1beta1
    schema:
      openAPIV3Schema:
        properties:
          spec:
            properties:
              name:
                description: the name of the queue
                type: string
              regions:
                description: "in which regions the resources should deployed, default\\
                  \\ is 'eu-central-1'"
                items:
                  type: string
                type: array
            required:
            - name
            type: object
          status:
            properties:
              queues:
                items:
                  type: string
                type: array
            type: object
        type: object
    served: true
    storage: true
    subresources:
      status: {}
  - name: v1alpha1
    schema:
      openAPIV3Schema:
        properties:
          spec:
            properties:
              name:
                description: the name of the queue
                type: string
              regions:
                description: "in which regions the resources should deployed, default\\
                  \\ is 'eu-central-1'"
                items:
                  type: string
                type: array
            required:
            - name
            type: object
          status:
            properties:
              queues:
                items:
                  type: string
                type: array
            type: object
        type: object
    served: true
    storage: true
    subresources:
      status: {}
`;

export class MockCrdRepository implements CrdRepository {
  load(): CustomResourceDefinition {
    const crd = load(data) as CustomResourceDefinition;
    crd.spec.versions?.forEach(version => {
      // we don't need the status here
      delete version.schema!.openAPIV3Schema?.properties?.status;
      // in our case, open api v3 schema is identical with json schema
    });
    return crd;
  }
}
