import {
  DatabaseWithJsonColumn,
  FormatJsonRefOptions,
  FormatOnConflictOptions,
  JsonRef,
  UpdateJsonColumnOptions,
} from './json'

export class MssqlDatabaseWithJsonColumn extends DatabaseWithJsonColumn {
  constructor() {
    super()
  }

  parseJsonColumnValue(x: string) {
    return JSON.parse(x)
  }

  formatJsonRef(ref: JsonRef, options?: FormatJsonRefOptions): string {
    const quotes = options?.forWhereClause ? '' : '"'
    const refText = `${ref.jsonColumn},'$.${ref.jsonField}'`
    return `COALESCE('${quotes}'+JSON_VALUE(${refText})+'${quotes}', JSON_QUERY(${refText}))`
  }

  updateJsonColumn(
    column: string,
    keys: string[],
    value: Record<string, any>,
    options?: UpdateJsonColumnOptions
  ) {
    const binds: Record<string, any> = {}
    let update = `JSON_MODIFY(${column},`
    keys.forEach((k) => {
      const binding = options?.namedBinding ? `(:${k})` : '?'
      update += ` '$.${k}', ${binding},`
      binds[k] = value[k]
    })
    return { update: update.substring(0, update.length - 1) + ')', binds }
  }

  formatOnConflict(_options: FormatOnConflictOptions) {
    throw new Error('not implemented')
    return ''
  }
}

export const mssqlDatabseWithJsonColumn = new MssqlDatabaseWithJsonColumn()
