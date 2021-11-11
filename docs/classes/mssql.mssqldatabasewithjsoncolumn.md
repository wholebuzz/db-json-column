[db-json-column](../README.md) / [Exports](../modules.md) / [mssql](../modules/mssql.md) / MssqlDatabaseWithJsonColumn

# Class: MssqlDatabaseWithJsonColumn

[mssql](../modules/mssql.md).MssqlDatabaseWithJsonColumn

## Hierarchy

- [*DatabaseWithJsonColumn*](json.databasewithjsoncolumn.md)

  ↳ **MssqlDatabaseWithJsonColumn**

## Table of contents

### Constructors

- [constructor](mssql.mssqldatabasewithjsoncolumn.md#constructor)

### Methods

- [formatJsonRef](mssql.mssqldatabasewithjsoncolumn.md#formatjsonref)
- [formatJsonRefText](mssql.mssqldatabasewithjsoncolumn.md#formatjsonreftext)
- [formatOnConflict](mssql.mssqldatabasewithjsoncolumn.md#formatonconflict)
- [parseJsonColumnValue](mssql.mssqldatabasewithjsoncolumn.md#parsejsoncolumnvalue)
- [parseRowWithJsonRefs](mssql.mssqldatabasewithjsoncolumn.md#parserowwithjsonrefs)
- [prepareUpdateJsonRefs](mssql.mssqldatabasewithjsoncolumn.md#prepareupdatejsonrefs)
- [returningJsonRefsAs](mssql.mssqldatabasewithjsoncolumn.md#returningjsonrefsas)
- [updateJsonColumn](mssql.mssqldatabasewithjsoncolumn.md#updatejsoncolumn)

## Constructors

### constructor

\+ **new MssqlDatabaseWithJsonColumn**(): [*MssqlDatabaseWithJsonColumn*](mssql.mssqldatabasewithjsoncolumn.md)

**Returns:** [*MssqlDatabaseWithJsonColumn*](mssql.mssqldatabasewithjsoncolumn.md)

Overrides: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [mssql.ts:9](https://github.com/wholebuzz/db-json-column/blob/master/src/mssql.ts#L9)

## Methods

### formatJsonRef

▸ **formatJsonRef**(`ref`: [*JsonRef*](../interfaces/json.jsonref.md), `options?`: [*FormatJsonRefOptions*](../interfaces/json.formatjsonrefoptions.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | [*JsonRef*](../interfaces/json.jsonref.md) |
| `options?` | [*FormatJsonRefOptions*](../interfaces/json.formatjsonrefoptions.md) |

**Returns:** *string*

Overrides: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [mssql.ts:18](https://github.com/wholebuzz/db-json-column/blob/master/src/mssql.ts#L18)

___

### formatJsonRefText

▸ **formatJsonRefText**(`x`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *string* |

**Returns:** *string*

Inherited from: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [json.ts:61](https://github.com/wholebuzz/db-json-column/blob/master/src/json.ts#L61)

___

### formatOnConflict

▸ **formatOnConflict**(`_options`: [*FormatOnConflictOptions*](../interfaces/json.formatonconflictoptions.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `_options` | [*FormatOnConflictOptions*](../interfaces/json.formatonconflictoptions.md) |

**Returns:** *string*

Overrides: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [mssql.ts:40](https://github.com/wholebuzz/db-json-column/blob/master/src/mssql.ts#L40)

___

### parseJsonColumnValue

▸ **parseJsonColumnValue**(`x`: *string*): *any*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *string* |

**Returns:** *any*

Overrides: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [mssql.ts:14](https://github.com/wholebuzz/db-json-column/blob/master/src/mssql.ts#L14)

___

### parseRowWithJsonRefs

▸ **parseRowWithJsonRefs**(`row`: *Record*<string, any\>, `returningAs?`: *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\>): *Record*<string, any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `row` | *Record*<string, any\> |
| `returningAs?` | *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\> |

**Returns:** *Record*<string, any\>

Inherited from: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [json.ts:76](https://github.com/wholebuzz/db-json-column/blob/master/src/json.ts#L76)

___

### prepareUpdateJsonRefs

▸ **prepareUpdateJsonRefs**(`fields`: *string*[]): [*UpdateJsonRefs*](../interfaces/json.updatejsonrefs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | *string*[] |

**Returns:** [*UpdateJsonRefs*](../interfaces/json.updatejsonrefs.md)

Inherited from: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [json.ts:97](https://github.com/wholebuzz/db-json-column/blob/master/src/json.ts#L97)

___

### returningJsonRefsAs

▸ **returningJsonRefsAs**(`fields`: *string*[]): [*ReturningJsonRefsAs*](../interfaces/json.returningjsonrefsas.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | *string*[] |

**Returns:** [*ReturningJsonRefsAs*](../interfaces/json.returningjsonrefsas.md)

Inherited from: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [json.ts:65](https://github.com/wholebuzz/db-json-column/blob/master/src/json.ts#L65)

___

### updateJsonColumn

▸ **updateJsonColumn**(`column`: *string*, `keys`: *string*[], `value`: *Record*<string, any\>, `options?`: [*UpdateJsonColumnOptions*](../interfaces/json.updatejsoncolumnoptions.md)): *object*

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | *string* |
| `keys` | *string*[] |
| `value` | *Record*<string, any\> |
| `options?` | [*UpdateJsonColumnOptions*](../interfaces/json.updatejsoncolumnoptions.md) |

**Returns:** *object*

| Name | Type |
| :------ | :------ |
| `binds` | *Record*<string, any\> |
| `update` | *string* |

Overrides: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [mssql.ts:24](https://github.com/wholebuzz/db-json-column/blob/master/src/mssql.ts#L24)
