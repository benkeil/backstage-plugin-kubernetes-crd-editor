import { RJSFSchema } from '@rjsf/utils';

export interface CustomResourceDefinition {
  spec: CustomResourceDefinitionSpec;
}

export interface CustomResourceDefinitionSpec {
  group: string;
  names: CustomResourceDefinitionNames;
  validation?: CustomResourceDefinitionValidation;
  version?: string;
  versions?: CustomResourceDefinitionVersion[];
  scope?: string;
}

export interface CustomResourceDefinitionNames {
  categories?: string[];
  kind: string;
  listKind?: string;
  plural: string;
  shortNames?: string[];
  singular?: string;
}

export interface CustomResourceDefinitionVersion {
  name: string;
  schema?: CustomResourceDefinitionValidation;
}

export interface CustomResourceDefinitionValidation {
  openAPIV3Schema: RJSFSchema;
}
