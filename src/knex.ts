import Knex from 'knex'
import { getDatabaseWithJsonColumnImplementation } from './impl'
import { JsonRef } from './json'

export const getKnexClientType = (knex: Knex): string => (knex as any).context.client.config.client

export function knexSelectJson(knex: Knex, query: Knex.QueryBuilder, fields: string[]) {
  const impl = getDatabaseWithJsonColumnImplementation(getKnexClientType(knex))
  if (impl) {
    const select = impl.returningJsonRefsAs(fields)
    return { ...select, query: query.select(select.fields.map((x) => knex.raw(x))) }
  } else {
    return { returningAs: undefined, query: query.select(fields) }
  }
}

export function knexAssembleJson(
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
