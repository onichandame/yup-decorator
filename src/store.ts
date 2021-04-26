import { ObjectSchema, object } from 'yup';

const ObjectSchemas = new Map<any, ObjectSchema<any>>();

export const getSchema = (prototype: any) => {
  let store = ObjectSchemas.get(prototype);
  if (!store) ObjectSchemas.set(prototype, object());
  store = ObjectSchemas.get(prototype);
  if (!store) throw new Error(`cannot create store`);
  return store;
};

export const setSchema = (prototype: any, schema: ObjectSchema<any>) => {
  ObjectSchemas.set(prototype, schema);
};
