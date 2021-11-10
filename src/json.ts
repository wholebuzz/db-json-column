export interface JsonRef {
  jsonColumn: string
  jsonField: string
}

export interface ReturningJsonRefsAs {
  fields: string[]
  returningAs: Record<string, JsonRef>
}

export interface SeparateJsonRefs {
  fields: string[]
  jsonRefs: Record<string, Record<string, any>>
}

export interface UpdateJsonColumn {
  binds: Record<string, any>
  update: string
}

export interface UpdateJsonColumnOptions {
  jsonb?: boolean
  namedBinding?: boolean
}

export function parseJsonRef(x: string): JsonRef {
  const dot = x.indexOf('.')
  const jsonColumn = x.substring(0, dot)
  const jsonField = x.substring(dot + 1)
  return { jsonColumn, jsonField }
}

export abstract class DatabaseWithJsonColumn {
  abstract formatJsonRef(ref: JsonRef): string
  abstract updateJsonColumn(
    column: string,
    fields: string[],
    value: Record<string, any>,
    options?: UpdateJsonColumnOptions
  ): UpdateJsonColumn

  parseJsonColumnValue(x: string) {
    return x
  }

  formatJsonRefText(x: string) {
    return this.formatJsonRef(parseJsonRef(x))
  }

  returningJsonRefsAs(fields: string[]): ReturningJsonRefsAs {
    const returningAs: Record<string, JsonRef> = {}
    fields = fields.map((x, i) => {
      const ref = parseJsonRef(x)
      if (!ref.jsonColumn) return x
      returningAs[`my_json_${i}`] = ref
      return `${this.formatJsonRef(ref)} as my_json_${i}`
    })
    return { fields, returningAs }
  }

  parseRowWithJsonRefs(
    row: Record<string, any>,
    returningAs?: Record<string, JsonRef>
  ): Record<string, any> {
    if (!returningAs) return row
    const ret: Record<string, any> = {}
    for (const key of Object.keys(row)) {
      const ref = returningAs[key]
      if (ref) {
        const v = row[key]
        if (v) {
          if (!ret[ref.jsonColumn]) ret[ref.jsonColumn] = {}
          ret[ref.jsonColumn][ref.jsonField] = this.parseJsonColumnValue(v)
        }
      } else {
        ret[key] = row[key]
      }
    }
    return ret
  }

  separateJsonRefs(fields: string[]): SeparateJsonRefs {
    const jsonRefs: Record<string, Record<string, any>> = {}
    fields = fields.filter((x) => {
      const ref = parseJsonRef(x)
      if (!ref.jsonColumn) return true
      if (!jsonRefs[ref.jsonColumn]) jsonRefs[ref.jsonColumn] = {}
      jsonRefs[ref.jsonColumn][ref.jsonField] = ''
      return false
    })
    return { fields, jsonRefs }
  }
}
