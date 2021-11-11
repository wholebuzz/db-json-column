import { Knex } from 'knex'
import { getDatabaseWithJsonColumnImplementation } from './impl'
import { FormatOnConflictOptions, JsonRef, parseJsonRef, UpdateJsonColumnOptions } from './json'

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

export function whereJson(knex: Knex, query: Knex.QueryBuilder, where: any[]) {
  const impl = getDatabaseWithJsonColumnImplementation(getClientType(knex))
  const formatOptions = { forWhereClause: true }
  if (Array.isArray(where[0])) {
    for (const clause of where) {
      if (Array.isArray(clause)) {
        const ref = typeof clause[0] === 'string' ? parseJsonRef(clause[0]) : undefined
        query = query.where(
          impl && ref?.jsonColumn ? knex.raw(impl.formatJsonRef(ref, formatOptions)) : clause[0],
          clause[1],
          clause[2]
        )
      } else {
        query = query.where(knex.raw(clause))
      }
    }
  } else {
    const ref = parseJsonRef(where[0])
    query = query.where(
      impl && ref ? knex.raw(impl.formatJsonRef(ref, formatOptions)) : where[0],
      where[1],
      where[2]
    )
  }
  return query
}

export function updateOnConflict(
  knex: Knex,
  query: Knex.QueryBuilder,
  options: FormatOnConflictOptions
) {
  const impl = getDatabaseWithJsonColumnImplementation(getClientType(knex))
  if (!impl) return query
  return knex.raw(`? ${impl.formatOnConflict(options)}`, [query])
}
