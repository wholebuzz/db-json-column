import { DatabaseWithJsonColumn, JsonRef } from './json'

export class PostgresDatabseWithJsonColumn extends DatabaseWithJsonColumn {
  formatJsonRef(ref: JsonRef): string {
    return `${ref.jsonColumn}->>'${ref.jsonField}'`
  }

  updateJsonColumn(column: string, keys: string[], values: Record<string, any>) {
    const binds: string[] = []
    let update = `jsonb_set(${column},`
    keys.forEach((k) => {
      update += ` '{${k}}', to_jsonb(?::text),`
      binds.push(values[k])
    })
    return { update: update.substring(0, update.length - 1) + ')', binds }
  }
}

export const postgresDatabseWithJsonColumn = new PostgresDatabseWithJsonColumn()
