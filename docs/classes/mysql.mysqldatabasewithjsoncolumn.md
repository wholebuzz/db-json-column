[db-json-column](../README.md) / [Exports](../modules.md) / [mysql](../modules/mysql.md) / MysqlDatabaseWithJsonColumn

# Class: MysqlDatabaseWithJsonColumn

[mysql](../modules/mysql.md).MysqlDatabaseWithJsonColumn

## Hierarchy

- [*DatabaseWithJsonColumn*](json.databasewithjsoncolumn.md)

  ↳ **MysqlDatabaseWithJsonColumn**

## Table of contents

### Constructors

- [constructor](mysql.mysqldatabasewithjsoncolumn.md#constructor)

### Methods

- [formatJsonRef](mysql.mysqldatabasewithjsoncolumn.md#formatjsonref)
- [formatJsonRefText](mysql.mysqldatabasewithjsoncolumn.md#formatjsonreftext)
- [formatOnConflict](mysql.mysqldatabasewithjsoncolumn.md#formatonconflict)
- [parseJsonColumnValue](mysql.mysqldatabasewithjsoncolumn.md#parsejsoncolumnvalue)
- [parseRowWithJsonRefs](mysql.mysqldatabasewithjsoncolumn.md#parserowwithjsonrefs)
- [prepareUpdateJsonRefs](mysql.mysqldatabasewithjsoncolumn.md#prepareupdatejsonrefs)
- [returningJsonRefsAs](mysql.mysqldatabasewithjsoncolumn.md#returningjsonrefsas)
- [updateJsonColumn](mysql.mysqldatabasewithjsoncolumn.md#updatejsoncolumn)

## Constructors

### constructor

\+ **new MysqlDatabaseWithJsonColumn**(): [*MysqlDatabaseWithJsonColumn*](mysql.mysqldatabasewithjsoncolumn.md)

**Returns:** [*MysqlDatabaseWithJsonColumn*](mysql.mysqldatabasewithjsoncolumn.md)

Overrides: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [mysql.ts:9](https://github.com/wholebuzz/db-json-column/blob/master/src/mysql.ts#L9)

## Methods

### formatJsonRef

▸ **formatJsonRef**(`ref`: [*JsonRef*](../interfaces/json.jsonref.md), `_options?`: [*FormatJsonRefOptions*](../interfaces/json.formatjsonrefoptions.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | [*JsonRef*](../interfaces/json.jsonref.md) |
| `_options?` | [*FormatJsonRefOptions*](../interfaces/json.formatjsonrefoptions.md) |

**Returns:** *string*

Overrides: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [mysql.ts:18](https://github.com/wholebuzz/db-json-column/blob/master/src/mysql.ts#L18)

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

▸ **formatOnConflict**(`options`: [*FormatOnConflictOptions*](../interfaces/json.formatonconflictoptions.md)): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [*FormatOnConflictOptions*](../interfaces/json.formatonconflictoptions.md) |

**Returns:** *string*

Overrides: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [mysql.ts:38](https://github.com/wholebuzz/db-json-column/blob/master/src/mysql.ts#L38)

___

### parseJsonColumnValue

▸ **parseJsonColumnValue**(`x`: *string*): *any*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *string* |

**Returns:** *any*

Overrides: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [mysql.ts:14](https://github.com/wholebuzz/db-json-column/blob/master/src/mysql.ts#L14)

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

Defined in: [mysql.ts:22](https://github.com/wholebuzz/db-json-column/blob/master/src/mysql.ts#L22)
