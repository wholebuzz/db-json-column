import Knex from 'knex'
import { knexAssembleJson, knexSelectJson } from './knex'

const tableName = 'db_json_column_test'
const record1 = { id: 1, data: { foo: 'bar', baz: 'bat' } }

describe('postgres', () => {
  let knex: Knex

  beforeAll(async () => {
    knex = Knex({
      client: 'postgresql',
      connection: {
        database: process.env.POSTGRES_DB_NAME ?? '',
        user: process.env.POSTGRES_DB_USER ?? '',
        password: process.env.POSTGRES_DB_PASS ?? '',
        host: process.env.POSTGRES_DB_HOST ?? '',
        port: parseInt(process.env.POSTGRES_DB_PORT ?? '', 10),
      },
    })
    const tableExists = await knex.schema.hasTable(tableName)
    if (tableExists) await knex.schema.dropTable(tableName)
    await knex.schema.createTable(tableName, (table) => {
      table.integer('id').primary()
      table.jsonb('data')
    })
  })

  it('Should insert and verify test row', async () => {
    await knex(tableName).insert(record1)
    expect((await knex(tableName).where('id', 1))[0]).toEqual(record1)
  })

  it('Should select json field value from test row', async () => {
    await testSelect(knex)
  })

  afterAll(async () => {
    await knex.destroy()
  })
})

describe('mysql', () => {
  let knex: Knex

  beforeAll(async () => {
    knex = Knex({
      client: 'mysql',
      connection: {
        database: process.env.MYSQL_DB_NAME ?? '',
        user: process.env.MYSQL_DB_USER ?? '',
        password: process.env.MYSQL_DB_PASS ?? '',
        host: process.env.MYSQL_DB_HOST ?? '',
        port: parseInt(process.env.MYSQL_DB_PORT ?? '', 10),
      },
    })
    const tableExists = await knex.schema.hasTable(tableName)
    if (tableExists) await knex.schema.dropTable(tableName)
    await knex.schema.createTable(tableName, (table) => {
      table.integer('id').primary()
      table.jsonb('data')
    })
  })

  it('Should insert and verify test row', async () => {
    await knex(tableName).insert({ id: 1, data: JSON.stringify(record1.data) })
    const row = (await knex(tableName).where('id', 1))[0]
    expect({ ...row, data: JSON.parse(row.data) }).toEqual(record1)
  })

  it('Should select json field value from test row', async () => {
    await testSelect(knex)
  })

  afterAll(async () => {
    await knex.destroy()
  })
})

async function testSelect(knex: Knex) {
  let { query, returningAs } = knexSelectJson(knex, knex(tableName), ['data.foo'])
  expect(knexAssembleJson(knex, await query, returningAs)[0]).toEqual({ data: { foo: 'bar' } })
  ;({ query, returningAs } = knexSelectJson(knex, knex(tableName), ['data.baz']))
  expect(knexAssembleJson(knex, await query, returningAs)[0]).toEqual({ data: { baz: 'bat' } })
  ;({ query, returningAs } = knexSelectJson(knex, knex(tableName), ['data.foo', 'data.baz']))
  expect(knexAssembleJson(knex, await query, returningAs)[0]).toEqual({
    data: { foo: 'bar', baz: 'bat' },
  })
}
