import { mysqlDatabseWithJsonColumn } from './mysql'
import { postgresDatabseWithJsonColumn } from './postgres'

export function getDatabaseWithJsonColumnImplementation(type: string) {
  switch (type) {
    case 'mysql':
      return mysqlDatabseWithJsonColumn
    case 'postgresql':
      return postgresDatabseWithJsonColumn
    default:
      return null
  }
}
