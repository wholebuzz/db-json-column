import { Knex } from 'knex'
import { getDatabaseWithJsonColumnImplementation } from './impl'
import { JsonRef, UpdateJsonColumnOptions } from './json'

export const getClientType = (knex: Knex): string => (knex as any).context.client.config.client

export async function selectAndParseJson(
  knex: Knex,
  inputQuery: Knex.QueryBuilder,
  fields: string[]
) {
  const { query, returningAs } = selectJson(knex, inputQuery, fields)
  return parseRowJson(knex, await query, returningAs)
}

export function selectJson(knex: Knex, query: Knex.QueryBuilder, fields: string[]) {
  const impl = getDatabaseWithJsonColumnImplementation(getClientType(knex))
  if (impl) {
    const select = impl.returningJsonRefsAs(fields)
    return { ...select, query: query.select(select.fields.map((x) => knex.raw(x))) }
  } else {
    return { returningAs: undefined, query: query.select(fields) }
  }
}

export function parseRowJson(
  knex: Knex,
  rows: Array<Record<string, any>>,
  returningAs?: Record<string, JsonRef>
) {
  const impl = getDatabaseWithJsonColumnImplementation(getClientType(knex))
  if (impl) {
    return rows.map((row) => impl.parseRowWithJsonRefs(row, returningAs))
  } else {
    return rows
  }
}

export function updateJson(
  knex: Knex,
  query: Knex.QueryBuilder,
  fields: string[],
  value: Record<string, any>,
  options?: UpdateJsonColumnOptions
) {
  const update: Record<string, any> = {}
  const impl = getDatabaseWithJsonColumnImplementation(getClientType(knex))
  if (impl) {
    const updateKeys = impl.prepareUpdateJsonRefs(fields)
    for (const field of updateKeys.fields) update[field] = value[field]
    for (const [field, fieldProps] of Object.entries(updateKeys.jsonRefs)) {
      const updateField = impl.updateJsonColumn(
        field,
        Object.keys(fieldProps),
        value[field],
        options
      )
      update[field] = knex.raw(updateField.update, Object.values(updateField.binds))
    }
  } else {
    for (const field of fields) update[field] = value[field]
  }
  if (options?.extra) {
    for (const field of Object.keys(options.extra)) update[field] = options.extra[field]
  }
  return query.update(update)
}
