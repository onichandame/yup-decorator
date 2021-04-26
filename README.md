# Yup, Decorator

This lib adds some helper decorators that works well with typeorm or type-graphql or typegoose.

# Examples

```typescript
import {Prop,ObjectSchema,getSchemaFromClass} from '@onichandame/yup-decorator'

const FilterLabel=Symbol(`filter`)

@YupObject()
export class Organization {
  @Prop()
  slogan: string
}

@YupObject()
export class Person {
  @Prop({schema: FilterLabel, required: false})
  @Prop({required: true})
  name: string

  @Prop({required: true})
  organization: Organization
}

const fullSchema= getSchemaFromClass(Person)
const filterSchema= getSchemaFromClass(FilterLabel)

fullSchema.validateSync({name: `david`, organization: {slogan: `yo`}})
filterSchema.validateSync({})
```
