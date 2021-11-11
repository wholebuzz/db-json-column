# db-json-column ![image](https://img.shields.io/npm/v/db-json-column) [![test](https://github.com/wholebuzz/db-json-column/actions/workflows/test.yaml/badge.svg)](https://github.com/wholebuzz/db-json-column/actions/workflows/test.yaml)

If you need to query JSON columns with your Query Builder and Connection Pool without writing raw SQL, this package is for you.

## Knex example

```typescript
await updateJson(knex, knex(tableName).where('id', 1), ['data.foo'], { data: { foo: 'bar' } })

// { data: { foo: 'bar' } }
await selectAndParseJson(knex, knex(tableName), ['data.foo'])
```

## TypeORM example

```typescript
await updateJson(
  repository.createQueryBuilder().update().where({ id: 1 }),
  ['data.foo'],
  { data: { foo: 'bar' } },
)

// { data: { foo: 'bar' } }
await selectAndParseJson(repository.createQueryBuilder(), ['data.foo'])
```

## Table of contents

- [knex](docs/modules/knex.md)
- [typeorm](docs/modules/typeorm.md)

