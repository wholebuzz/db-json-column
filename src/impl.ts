import { mssqlDatabseWithJsonColumn } from './mssql'
import { mysqlDatabseWithJsonColumn } from './mysql'
import { postgresDatabseWithJsonColumn } from './postgres'

export function getDatabaseWithJsonColumnImplementation(type: string) {
  switch (type) {
    case 'mssql':
      return mssqlDatabseWithJsonColumn
    case 'mysql':
      return mysqlDatabseWithJsonColumn
    case 'postgres':
    case 'postgresql':
      return postgresDatabseWithJsonColumn
    default:
      return null
  }
}
