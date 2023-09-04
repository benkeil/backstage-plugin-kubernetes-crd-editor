import { CrdRepository } from '../domain/repositories/CrdRepository';
import { load } from 'js-yaml';
import { CustomResourceDefinition } from '../domain/data/CustomResourceDefinition';
import { RJSFSchema } from '@rjsf/utils';

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

const metadataSchema: RJSFSchema = {
  properties: {
    name: {
      description:
        'An identifier of your resource. Must be unique inside the namespace. This is not the resource name!',
      type: 'string',
    },
    namespace: {
      description:
        'Should be your team name. All resources must be unique in your namespace.',
      type: 'string',
    },
    labels: {
      type: 'object',
      properties: {
        'account-id': {
          description:
            'The account id where the resources should be deployed in.',
          type: 'string',
        },
        environment: {
          description: 'A free text identifier to tag your resources with',
          type: 'string',
        },
        team: {
          description:
            'Your team name, should be identical with the namespace.',
          type: 'string',
        },
      },
      required: ['account-id', 'environment', 'team'],
      additionalProperties: {
        type: 'string',
      },
    },
  },
  required: ['name', 'namespace'],
  type: 'object',
};

export class MockCrdRepository implements CrdRepository {
  load(): CustomResourceDefinition[] {
    const crd = load(data) as CustomResourceDefinition;
    crd.spec.versions?.forEach(version => {
      // we don't need the status here
      delete version.schema!.openAPIV3Schema.properties?.status;
      // in our case, open api v3 schema is identical with json schema
      version.schema!.openAPIV3Schema.required = [
        ...(version.schema!.openAPIV3Schema.required ?? []),
        ...(metadataSchema.required ?? []),
      ];
      version.schema!.openAPIV3Schema.properties = {
        ...metadataSchema.properties,
        ...version.schema!.openAPIV3Schema?.properties,
      };
    });
    return [crd];
  }
}
