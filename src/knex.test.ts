import { Knex, knex as newKnex } from 'knex'
import {
  selectAndParseJson,
  selectServerTimestamp,
  updateJson,
  updateOnConflict,
  whereJson,
} from './knex'

const tableName = 'db_json_column_test'
const record1 = { id: 1, data: { foo: 'bar', baz: 'bat', bazel: { mimble: 'wimble' } } }

describe('mssql', () => {
  let knex: Knex

  beforeAll(async () => {
    knex = newKnex({
      client: 'mssql',
      connection: {
        database: process.env.MSSQL_DB_NAME ?? '',
        user: process.env.MSSQL_DB_USER ?? '',
        password: process.env.MSSQL_DB_PASS ?? '',
        host: process.env.MSSQL_DB_HOST ?? '',
        port: parseInt(process.env.MSSQL_DB_PORT ?? '', 10),
        options: { trustServerCertificate: true },
      },
    })
    const tableExists = await knex.schema.hasTable(tableName)
    if (tableExists) await knex.schema.dropTable(tableName)
    await knex.schema.createTable(tableName, (table) => {
      table.integer('id').primary()
      table.json('data')
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

  it('Should update json field value on test row', async () => {
    await testUpdate(knex)
  })

  it('Should select server timestamp', async () => {
    await testSelectServerTimestamp(knex)
  })

  afterAll(async () => {
    await knex.destroy()
  })
})

describe('mysql', () => {
  let knex: Knex

  beforeAll(async () => {
    knex = newKnex({
      client: 'mysql',
      connection: {
        database: process.env.MYSQL_DB_NAME ?? '',
        user: process.env.MYSQL_DB_USER ?? '',
        password: process.env.MYSQL_DB_PASS ?? '',
        host: process.env.MYSQL_DB_HOST ?? '',
        port: parseInt(process.env.MYSQL_DB_PORT ?? '', 10),
        timezone: 'UTC',
      },
    })
    const tableExists = await knex.schema.hasTable(tableName)
    if (tableExists) await knex.schema.dropTable(tableName)
    await knex.schema.createTable(tableName, (table) => {
      table.integer('id').primary()
      table.json('data')
    })
  })

  it('Should insert and verify test row', async () => {
    await updateOnConflict(
      knex,
      knex(tableName).insert({ id: 1, data: JSON.stringify(record1.data) }),
      { updateOnConflict: ['data'] }
    )
    const row = (await knex(tableName).where('id', 1))[0]
    expect({ ...row, data: JSON.parse(row.data) }).toEqual(record1)
  })

  it('Should select json field value from test row', async () => {
    await testSelect(knex)
  })

  it('Should update json field value on test row', async () => {
    await testUpdate(knex)
  })

  it('Should select server timestamp', async () => {
    await testSelectServerTimestamp(knex)
  })

  afterAll(async () => {
    await knex.destroy()
  })
})

describe('postgres', () => {
  let knex: Knex

  beforeAll(async () => {
    knex = newKnex({
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
      table.json('data')
    })
  })

  it('Should insert and verify test row', async () => {
    await updateOnConflict(knex, knex(tableName).insert(record1), {
      keys: ['id'],
      returning: ['id'],
      updateOnConflict: ['data'],
    })
    expect((await knex(tableName).where('id', 1))[0]).toEqual(record1)
  })

  it('Should select json field value from test row', async () => {
    await testSelect(knex)
  })

  it('Should update json field value on test row', async () => {
    await testUpdate(knex)
  })

  it('Should select server timestamp', async () => {
    await testSelectServerTimestamp(knex)
  })

  afterAll(async () => {
    await knex.destroy()
  })
})

async function testSelect(knex: Knex) {
  expect(await selectAndParseJson(knex, knex(tableName), ['data.foo'])).toEqual([
    {
      data: { foo: 'bar' },
    },
  ])
  expect(await selectAndParseJson(knex, knex(tableName).where('id', 1), ['data.baz'])).toEqual([
    {
      data: { baz: 'bat' },
    },
  ])
  expect(
    await selectAndParseJson(knex, whereJson(knex, knex(tableName), ['data.foo', '=', 'bar']), [
      'data.foo',
      'data.baz',
    ])
  ).toEqual([
    {
      data: { foo: 'bar', baz: 'bat' },
    },
  ])
  expect(
    await selectAndParseJson(
      knex,
      whereJson(knex, knex(tableName), [
        ['data.foo', '=', 'bar'],
        ['data.baz', '=', 'bat'],
      ]),
      ['data.foo', 'data.bazel']
    )
  ).toEqual([
    {
      data: { foo: 'bar', bazel: { mimble: 'wimble' } },
    },
  ])
}

async function testUpdate(knex: Knex) {
  const options = { jsonb: false }
  await updateJson(knex, knex(tableName), ['data.foo'], { data: { foo: 'zap' } }, options)
  expect(await selectAndParseJson(knex, knex(tableName), ['data.foo'])).toEqual([
    {
      data: { foo: 'zap' },
    },
  ])
  await updateJson(
    knex,
    knex(tableName).where('id', 1),
    ['data.baz'],
    { data: { baz: 'bap' } },
    options
  )
  expect(await selectAndParseJson(knex, knex(tableName), ['data.baz'])).toEqual([
    {
      data: { baz: 'bap' },
    },
  ])
}

async function testSelectServerTimestamp(knex: Knex) {
  const date = await selectServerTimestamp(knex)
  const now = new Date()
  expect(date instanceof Date).toBe(true)
  expect(Math.abs(now.getTime() - date.getTime())).toBeLessThan(1000 * 60)
}
