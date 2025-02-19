import { JSONSchema, Option, Schema, SchemaAST } from "effect"
import * as ApiSchema from "../spec/api_schema"

const effectSchemas = Object.entries(ApiSchema).filter(([_, value]) => Schema.isSchema(value))

const jsonSchemas = effectSchemas.reduce((acc, [key, value]) => {
  const schema = value as unknown as Schema.Schema<unknown>
  const skip = SchemaAST.getAnnotation(ApiSchema.Skip)(schema.ast).pipe(Option.getOrElse(() => false))
  if (skip) {
    return acc
  }
  const jsonSchema = JSONSchema.make(schema)
  delete jsonSchema["$schema"]
  acc[key] = jsonSchema
  return acc
}, {} as Record<string, JSONSchema.JsonSchema7Root>)

// console.dir(jsonSchemas, { depth: null })
console.log(JSON.stringify(jsonSchemas, null, 2))
