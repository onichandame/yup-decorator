import { Prop, getSchemaFromClass } from '../src';

describe('decorators', () => {
  it('can define plain schema', () => {
    class Person {
      @Prop()
      name?: string;
    }
    const schema = getSchemaFromClass(Person);
    expect(schema.validate({ name: `hi` })).resolves.toBeTruthy();
    expect(schema.validate({ name: {} })).rejects.toBeTruthy();
  });

  it(`can define required properties`, () => {
    class Person {
      @Prop({ required: true })
      name!: string;
    }
    const schema = getSchemaFromClass(Person);
    expect(schema.validate({ name: `asdf` })).resolves.toBeTruthy();
    expect(schema.validate({ name: `` })).rejects.toBeTruthy();
  });

  it(`can define different schemas in the same class`, () => {
    const key1 = Symbol(`schema`);
    const key2 = Symbol(`schema`);
    class Person {
      @Prop({ schema: key1, required: true })
      @Prop({ schema: key2, required: false })
      name!: string;
    }
    const schema1 = getSchemaFromClass(Person, key1);
    const schema2 = getSchemaFromClass(Person, key2);
    expect(schema1.validate({ name: `asdf` })).resolves.toBeTruthy();
    expect(schema1.validate({})).rejects.toBeTruthy();
    expect(schema2.validate({ name: `asdf` })).resolves.toBeTruthy();
    expect(schema2.validate({})).resolves.toBeTruthy();
  });
});
