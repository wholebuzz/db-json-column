import { DatabaseWithJsonColumn, JsonRef, UpdateJsonColumnOptions } from './json'

export class PostgresDatabaseWithJsonColumn extends DatabaseWithJsonColumn {
  formatJsonRef(ref: JsonRef): string {
    return `${ref.jsonColumn}->'${ref.jsonField}'`
  }

  updateJsonColumn(
    column: string,
    fields: string[],
    value: Record<string, any>,
    options?: UpdateJsonColumnOptions
  ) {
    const jsonb = options?.jsonb !== false
    const binds: Record<string, any> = {}
    let update = `jsonb_set(${column}${jsonb ? '' : '::jsonb'},`
    fields.forEach((k) => {
      const binding = options?.namedBinding ? `(:${k})` : '?'
      update += ` '{${k}}', to_jsonb(${binding}::text),`
      binds[k] = value[k]
    })
    return { update: update.substring(0, update.length - 1) + `)${jsonb ? '' : '::json'}`, binds }
  }
}

export const postgresDatabseWithJsonColumn = new PostgresDatabaseWithJsonColumn()
