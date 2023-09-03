import { CustomResourceDefinition } from '../data/CustomResourceDefinition';

export interface CrdRepository {
  load(): CustomResourceDefinition;
}
