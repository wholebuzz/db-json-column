import { Knex } from 'knex'
import { getDatabaseWithJsonColumnImplementation } from './impl'
import { JsonRef } from './json'

export const getKnexClientType = (knex: Knex): string => (knex as any).context.client.config.client

export async function knexSelectAndParseJson(
  knex: Knex,
  inputQuery: Knex.QueryBuilder,
  fields: string[]
) {
  const { query, returningAs } = knexSelectJson(knex, inputQuery, fields)
  return knexParseRowJson(knex, await query, returningAs)
}

export function knexSelectJson(knex: Knex, query: Knex.QueryBuilder, fields: string[]) {
  const impl = getDatabaseWithJsonColumnImplementation(getKnexClientType(knex))
  if (impl) {
    const select = impl.returningJsonRefsAs(fields)
    return { ...select, query: query.select(select.fields.map((x) => knex.raw(x))) }
  } else {
    return { returningAs: undefined, query: query.select(fields) }
  }
}

export function knexParseRowJson(
  knex: Knex,
  rows: Array<Record<string, any>>,
  returningAs?: Record<string, JsonRef>
) {
  const impl = getDatabaseWithJsonColumnImplementation(getKnexClientType(knex))
  if (impl) {
    return rows.map((row) => impl.assembleReturningJsonRefsAs(row, returningAs))
  } else {
    return rows
  }
}

export function knexUpdateJson(
  knex: Knex,
  query: Knex.QueryBuilder,
  fields: string[],
  value: Record<string, any>,
  extra?: Record<string, any>
) {
  const update: Record<string, any> = {}
  const impl = getDatabaseWithJsonColumnImplementation(getKnexClientType(knex))
  if (impl) {
    const updateKeys = impl.separateJsonRefs(fields)
    for (const field of updateKeys.fields) update[field] = value[field]
    for (const [field, fieldProps] of Object.entries(updateKeys.jsonRefs)) {
      const updateField = impl.updateJsonColumn(field, Object.keys(fieldProps), value[field])
      update[field] = knex.raw(updateField.update, updateField.binds)
    }
  } else {
    for (const field of fields) update[field] = value[field]
  }
  if (extra) {
    for (const field of Object.keys(extra)) update[field] = extra[field]
  }
  return query.update(update)
}
