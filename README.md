# Yup, Decorator

This lib adds some helper decorators that works well with typeorm or type-graphql or typegoose. Example:

```typescript
import {Prop,ObjectSchema,getSchemaFromClass} from '@onichandame/yup-decorator'

@YupObject()
export class Organization {
  @Prop()
  slogan: string
}

@YupObject()
export class Person {
  @Prop()
  name: string

  @Prop()
  organization: Organization
}

export const schema = getSchemaFromClass(Person)
```
