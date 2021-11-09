import { DatabaseWithJsonColumn, JsonRef } from './json'

export class MssqlDatabseWithJsonColumn extends DatabaseWithJsonColumn {
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

  updateJsonColumn(column: string, keys: string[], values: Record<string, any>) {
    const binds: string[] = []
    let update = `JSON_MODIFY(${column},`
    keys.forEach((k) => {
      update += ` '$.${k}', ?,`
      binds.push(values[k])
    })
    return { update: update.substring(0, update.length - 1) + ')', binds }
  }
}

export const mssqlDatabseWithJsonColumn = new MssqlDatabseWithJsonColumn()
