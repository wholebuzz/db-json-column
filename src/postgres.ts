import {
  DatabaseWithJsonColumn,
  FormatJsonRefOptions,
  FormatOnConflictOptions,
  JsonRef,
  UpdateJsonColumnOptions,
} from './json'

export class PostgresDatabaseWithJsonColumn extends DatabaseWithJsonColumn {
  formatJsonRef(ref: JsonRef, options?: FormatJsonRefOptions): string {
    return `${ref.jsonColumn}->${options?.forWhereClause ? '>' : ''}'${ref.jsonField}'`
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

  formatOnConflict(options: FormatOnConflictOptions) {
    const onConflict = options?.constraintName
      ? `ON CONSTRAINT ${options.constraintName}`
      : `(${options.keys!.join(',')})`
    const onConflictDo = options.updateOnConflict
      ? 'UPDATE SET ' + options.updateOnConflict.map((x) => `${x}=EXCLUDED.${x}`).join(', ')
      : 'NOTHING'
    return (
      `ON CONFLICT ${onConflict} DO ${onConflictDo}` +
      (options.returning ? ` RETURNING ${options.returning.join(',')}` : '')
    )
  }
}

export const postgresDatabseWithJsonColumn = new PostgresDatabaseWithJsonColumn()
