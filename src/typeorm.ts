import { Connection, QueryBuilder, SelectQueryBuilder } from 'typeorm'
import { getDatabaseWithJsonColumnImplementation } from './impl'
import { JsonRef } from './json'

export const getDriverType = (conn: Connection): string => conn.driver.options.type

export async function selectAndParseJson<Entity>(
  inputQuery: QueryBuilder<Entity>,
  fields: string[]
) {
  const { query, returningAs } = selectJson(inputQuery, fields)
  return parseRawJson(query, returningAs)
}

export function selectJson<Entity>(query: QueryBuilder<Entity>, fields: string[]) {
  const impl = getDatabaseWithJsonColumnImplementation(getDriverType(query.connection))
  if (impl) {
    const select = impl.returningJsonRefsAs(fields)
    return { ...select, query: query.select(select.fields) }
  } else {
    return { returningAs: undefined, query: query.select(fields) }
  }
}

export async function parseRawJson<Entity>(
  query: SelectQueryBuilder<Entity>,
  returningAs?: Record<string, JsonRef>
) {
  return parseRowJson(query.connection, await query.getRawMany(), returningAs)
}

export function parseRowJson(
  conn: Connection,
  rows: Array<Record<string, any>>,
  returningAs?: Record<string, JsonRef>
) {
  const impl = getDatabaseWithJsonColumnImplementation(getDriverType(conn))
  if (impl) {
    return rows.map((row) => impl.assembleReturningJsonRefsAs(row, returningAs))
  } else {
    return rows
  }
}

/*
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
*/
