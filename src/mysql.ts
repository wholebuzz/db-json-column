import { DatabaseWithJsonColumn, JsonRef } from './json'

export class MysqlDatabseWithJsonColumn extends DatabaseWithJsonColumn {
  constructor() {
    super()
  }

  parseJsonColumnValue(x: string) {
    return JSON.parse(x)
  }

  formatJsonRef(ref: JsonRef): string {
    return `${ref.jsonColumn}->"$.${ref.jsonField}"`
  }

  updateJsonColumn(column: string, keys: string[], values: Record<string, any>) {
    const binds: string[] = []
    let update = `JSON_SET(${column},`
    keys.forEach((k) => {
      update += ` "$.${k}", ?,`
      binds.push(values[k])
    })
    return { update: update.substring(0, update.length - 1) + ')', binds }
  }
}

export const mysqlDatabseWithJsonColumn = new MysqlDatabseWithJsonColumn()
