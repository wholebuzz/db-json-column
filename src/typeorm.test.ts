import { Connection, createConnection, Repository } from 'typeorm'
import { DbJsonColumnTest } from './entity/DbJsonColumnTest'
import { DbJsonColumnTest as DbTextColumnTest } from './entity/DbTextColumnTest'
import { selectAndParseJson, updateJson } from './typeorm'

describe('mssql', () => {
  let connection: Connection

  beforeAll(async () => {
    connection = await createConnection({
      type: 'mssql',
      host: process.env.MSSQL_DB_HOST ?? '',
      port: parseInt(process.env.MSSQL_DB_PORT ?? '', 10),
      username: process.env.MSSQL_DB_USER ?? '',
      password: process.env.MSSQL_DB_PASS ?? '',
      database: process.env.MSSQL_DB_NAME ?? '',
      entities: [DbTextColumnTest],
      synchronize: true,
      logging: false,
      extra: { trustServerCertificate: true },
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
  expect(
    await selectAndParseJson(repository.createQueryBuilder().where({ id: 1 }), ['data.baz'])
  ).toEqual([
    {
      data: { baz: 'bap' },
    },
  ])
  expect(
    await selectAndParseJson(repository.createQueryBuilder(), ['data.foo', 'data.baz'])
  ).toEqual([
    {
      data: { foo: 'zap', baz: 'bap' },
    },
  ])
  expect(
    await selectAndParseJson(repository.createQueryBuilder(), ['data.foo', 'data.bazel'])
  ).toEqual([
    {
      data: { foo: 'zap', bazel: { mimble: 'wimble' } },
    },
  ])
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
  await updateJson(
    repository.createQueryBuilder().update().where({ id: 1 }),
    ['data.baz'],
    {
      data: { baz: 'bapel' },
    },
    options
  ).execute()
  expect(await selectAndParseJson(repository.createQueryBuilder(), ['data.baz'])).toEqual([
    {
      data: { baz: 'bapel' },
    },
  ])
}
