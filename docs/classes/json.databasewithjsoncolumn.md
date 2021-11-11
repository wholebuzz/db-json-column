[db-json-column](../README.md) / [Exports](../modules.md) / [json](../modules/json.md) / DatabaseWithJsonColumn

# Class: DatabaseWithJsonColumn

[json](../modules/json.md).DatabaseWithJsonColumn

## Hierarchy

- **DatabaseWithJsonColumn**

  ↳ [*MssqlDatabaseWithJsonColumn*](mssql.mssqldatabasewithjsoncolumn.md)

  ↳ [*MysqlDatabaseWithJsonColumn*](mysql.mysqldatabasewithjsoncolumn.md)

  ↳ [*PostgresDatabaseWithJsonColumn*](postgres.postgresdatabasewithjsoncolumn.md)

## Table of contents

### Constructors

- [constructor](json.databasewithjsoncolumn.md#constructor)

### Methods

- [formatJsonRef](json.databasewithjsoncolumn.md#formatjsonref)
- [formatJsonRefText](json.databasewithjsoncolumn.md#formatjsonreftext)
- [formatOnConflict](json.databasewithjsoncolumn.md#formatonconflict)
- [parseJsonColumnValue](json.databasewithjsoncolumn.md#parsejsoncolumnvalue)
- [parseRowWithJsonRefs](json.databasewithjsoncolumn.md#parserowwithjsonrefs)
- [prepareUpdateJsonRefs](json.databasewithjsoncolumn.md#prepareupdatejsonrefs)
- [returningJsonRefsAs](json.databasewithjsoncolumn.md#returningjsonrefsas)
- [updateJsonColumn](json.databasewithjsoncolumn.md#updatejsoncolumn)

## Constructors

### constructor

\+ **new DatabaseWithJsonColumn**(): [*DatabaseWithJsonColumn*](json.databasewithjsoncolumn.md)

**Returns:** [*DatabaseWithJsonColumn*](json.databasewithjsoncolumn.md)

## Methods

### formatJsonRef

▸ `Abstract` **formatJsonRef**(`ref`: [*JsonRef*](../interfaces/json.jsonref.md), `options?`: [*FormatJsonRefOptions*](../interfaces/json.formatjsonrefoptions.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | [*JsonRef*](../interfaces/json.jsonref.md) |
| `options?` | [*FormatJsonRefOptions*](../interfaces/json.formatjsonrefoptions.md) |

**Returns:** *string*

Defined in: [json.ts:46](https://github.com/wholebuzz/db-json-column/blob/master/src/json.ts#L46)

___

### formatJsonRefText

▸ **formatJsonRefText**(`x`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *string* |

**Returns:** *string*

Defined in: [json.ts:61](https://github.com/wholebuzz/db-json-column/blob/master/src/json.ts#L61)

___

### formatOnConflict

▸ `Abstract` **formatOnConflict**(`options`: [*FormatOnConflictOptions*](../interfaces/json.formatonconflictoptions.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [*FormatOnConflictOptions*](../interfaces/json.formatonconflictoptions.md) |

**Returns:** *string*

Defined in: [json.ts:55](https://github.com/wholebuzz/db-json-column/blob/master/src/json.ts#L55)

___

### parseJsonColumnValue

▸ **parseJsonColumnValue**(`x`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *string* |

**Returns:** *string*

Defined in: [json.ts:57](https://github.com/wholebuzz/db-json-column/blob/master/src/json.ts#L57)

___

### parseRowWithJsonRefs

▸ **parseRowWithJsonRefs**(`row`: *Record*<string, any\>, `returningAs?`: *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\>): *Record*<string, any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | *Record*<string, any\> |
| `returningAs?` | *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\> |

**Returns:** *Record*<string, any\>

Defined in: [json.ts:76](https://github.com/wholebuzz/db-json-column/blob/master/src/json.ts#L76)

___

### prepareUpdateJsonRefs

▸ **prepareUpdateJsonRefs**(`fields`: *string*[]): [*UpdateJsonRefs*](../interfaces/json.updatejsonrefs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | *string*[] |

**Returns:** [*UpdateJsonRefs*](../interfaces/json.updatejsonrefs.md)

Defined in: [json.ts:97](https://github.com/wholebuzz/db-json-column/blob/master/src/json.ts#L97)

___

### returningJsonRefsAs

▸ **returningJsonRefsAs**(`fields`: *string*[]): [*ReturningJsonRefsAs*](../interfaces/json.returningjsonrefsas.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | *string*[] |

**Returns:** [*ReturningJsonRefsAs*](../interfaces/json.returningjsonrefsas.md)

Defined in: [json.ts:65](https://github.com/wholebuzz/db-json-column/blob/master/src/json.ts#L65)

___

### updateJsonColumn

▸ `Abstract` **updateJsonColumn**(`column`: *string*, `fields`: *string*[], `value`: *Record*<string, any\>, `options?`: [*UpdateJsonColumnOptions*](../interfaces/json.updatejsoncolumnoptions.md)): [*UpdateJsonColumn*](../interfaces/json.updatejsoncolumn.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | *string* |
| `fields` | *string*[] |
| `value` | *Record*<string, any\> |
| `options?` | [*UpdateJsonColumnOptions*](../interfaces/json.updatejsoncolumnoptions.md) |

**Returns:** [*UpdateJsonColumn*](../interfaces/json.updatejsoncolumn.md)

Defined in: [json.ts:48](https://github.com/wholebuzz/db-json-column/blob/master/src/json.ts#L48)
