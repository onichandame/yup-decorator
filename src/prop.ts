import { setSchema, getSchema } from './store';
import * as yup from 'yup';

type BaseArgs = { schema?: string | symbol; required?: boolean | string };

const AmendBaseTests = (schema: yup.BaseSchema, args: BaseArgs) => {
  if (args.required)
    schema = schema.required(
      typeof args.required === `string` ? args.required : undefined
    );
  else schema = schema.notRequired();
  return schema;
};

const getYupBaseConstructor = (Type: any) => {
  switch (Type) {
    case String:
      return yup.string;
    case Number:
      return yup.number;
    case Date:
      return yup.date;
    case Boolean:
      return yup.bool;
    default:
      return null;
  }
};

export const Prop = (args: BaseArgs = {}) => {
  return ((target, key) => {
    const schemaKey = args.schema || target;
    if (typeof key === `symbol`)
      throw new Error(`key of yup object schema cannot be of type symbol!`);
    const store = getSchema(schemaKey);
    if (!store) throw new Error(`failed to load store!`);
    const PropertyType = Reflect.getMetadata(`design:type`, target, key);
    const Constructor = getYupBaseConstructor(PropertyType);
    if (!Constructor) throw new Error(`non primitive type not supported yet`);
    const property: { [key: string]: yup.AnySchema } = {};
    property[key] = AmendBaseTests(Constructor(), args);
    setSchema(schemaKey, store.shape(property));
  }) as PropertyDecorator;
};
