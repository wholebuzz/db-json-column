import {
  DatabaseWithJsonColumn,
  FormatJsonRefOptions,
  FormatOnConflictOptions,
  JsonRef,
  UpdateJsonColumnOptions,
} from './json'

export class MysqlDatabaseWithJsonColumn extends DatabaseWithJsonColumn {
  constructor() {
    super()
  }

  parseJsonColumnValue(x: string) {
    return JSON.parse(x)
  }

  formatJsonRef(ref: JsonRef, _options?: FormatJsonRefOptions): string {
    return `${ref.jsonColumn}->"$.${ref.jsonField}"`
  }

  updateJsonColumn(
    column: string,
    keys: string[],
    value: Record<string, any>,
    options?: UpdateJsonColumnOptions
  ) {
    const binds: Record<string, any> = {}
    let update = `JSON_SET(${column},`
    keys.forEach((k) => {
      const binding = options?.namedBinding ? `(:${k})` : '?'
      update += ` "$.${k}", ${binding},`
      binds[k] = value[k]
    })
    return { update: update.substring(0, update.length - 1) + ')', binds }
  }

  formatOnConflict(options: FormatOnConflictOptions) {
    return (
      `ON DUPLICATE KEY UPDATE ` +
      (options.updateOnConflict
        ? options.updateOnConflict.map((x) => `${x}=VALUES(${x})`).join(', ')
        : 'id = id')
    )
  }
}

export const mysqlDatabseWithJsonColumn = new MysqlDatabaseWithJsonColumn()
