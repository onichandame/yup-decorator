import { getSchema } from './store';

export function getSchemaFromClass(cls: Function, schemaKey?: string | symbol) {
  const schema = getSchema(schemaKey || cls.prototype);
  return schema;
}
