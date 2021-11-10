import { Connection, createConnection, Repository } from 'typeorm'
import { DbJsonColumnTest } from './entity/DbJsonColumnTest'
import { selectAndParseJson, updateJson } from './typeorm'

describe('mysql', () => {
  let connection: Connection

  beforeAll(async () => {
    connection = await createConnection({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST ?? '',
      port: parseInt(process.env.MYSQL_DB_PORT ?? '', 10),
      username: process.env.MYSQL_DB_USER ?? '',
      password: process.env.MYSQL_DB_PASS ?? '',
      database: process.env.MYSQL_DB_NAME ?? '',
      entities: [DbJsonColumnTest],
      synchronize: true,
      logging: false,
    })
  })

  it('Should select json field value from test row', async () => {
    await testSelect(connection.getRepository('DbJsonColumnTest'))
  })

  it('Should update json field value on test row', async () => {
    await testUpdate(connection.getRepository('DbJsonColumnTest'))
  })

  afterAll(async () => {
    await connection.close()
  })
})

describe('postgres', () => {
  let connection: Connection

  beforeAll(async () => {
    connection = await createConnection({
      type: 'postgres',
      host: process.env.POSTGRES_DB_HOST ?? '',
      port: parseInt(process.env.POSTGRES_DB_PORT ?? '', 10),
      username: process.env.POSTGRES_DB_USER ?? '',
      password: process.env.POSTGRES_DB_PASS ?? '',
      database: process.env.POSTGRES_DB_NAME ?? '',
      entities: [DbJsonColumnTest],
      synchronize: true,
      logging: false,
    })
  })

  it('Should select json field value from test row', async () => {
    await testSelect(connection.getRepository('DbJsonColumnTest'))
  })

  it('Should update json field value on test row', async () => {
    await testUpdate(connection.getRepository('DbJsonColumnTest'))
  })

  afterAll(async () => {
    await connection.close()
  })
})

async function testSelect<Entity>(repository: Repository<Entity>) {
  expect(await selectAndParseJson(repository.createQueryBuilder(), ['data.foo'])).toEqual([
    {
      data: { foo: 'zap' },
    },
  ])
  /*
    expect(await selectAndParseJson(knex, knex(tableName).where('id', 1), ['data.baz'])).toEqual([
      {
        data: { baz: 'bat' },
      },
    ])
    expect(await selectAndParseJson(knex, knex(tableName), ['data.foo', 'data.baz'])).toEqual([
      {
        data: { foo: 'bar', baz: 'bat' },
      },
    ])
    expect(await selectAndParseJson(knex, knex(tableName), ['data.foo', 'data.bazel'])).toEqual([
      {
        data: { foo: 'bar', bazel: { mimble: 'wimble' } },
      },
    ])*/
}

async function testUpdate<Entity>(repository: Repository<Entity>) {
  const options = { jsonb: false }
  await updateJson(
    repository.createQueryBuilder().update(),
    ['data.foo'],
    {
      data: { foo: 'zazzle' },
    },
    options
  ).execute()
  expect(await selectAndParseJson(repository.createQueryBuilder(), ['data.foo'])).toEqual([
    {
      data: { foo: 'zazzle' },
    },
  ])
  /*await updateJson(knex, knex(tableName).where('id', 1), ['data.baz'], { data: { baz: 'bap' } })
    expect(await selectAndParseJson(knex, knex(tableName), ['data.baz'])).toEqual([
      {
        data: { baz: 'bap' },
      },
    ])
    await knexUpdateJson(knex, knex(tableName), ['data.foo', 'data.baz'], {
      data: { foo: 's13', baz: 's14' },
    })
    expect(await knexSelectAndParseJson(knex, knex(tableName), ['data.foo', 'data.baz'])).toEqual([
      {
        data: { foo: 's13', baz: 's14' },
      },
    ])*/
}
