import { DatabaseWithJsonColumn, JsonRef, UpdateJsonColumnOptions } from './json'

export class MssqlDatabaseWithJsonColumn extends DatabaseWithJsonColumn {
  constructor() {
    super()
  }

  parseJsonColumnValue(x: string) {
    return JSON.parse(x)
  }

  formatJsonRef(ref: JsonRef): string {
    const refText = `${ref.jsonColumn},'$.${ref.jsonField}'`
    return `COALESCE('"'+JSON_VALUE(${refText})+'"', JSON_QUERY(${refText}))`
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
}

export const mssqlDatabseWithJsonColumn = new MssqlDatabaseWithJsonColumn()
