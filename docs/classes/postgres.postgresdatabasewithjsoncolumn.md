[db-json-column](../README.md) / [Exports](../modules.md) / [postgres](../modules/postgres.md) / PostgresDatabaseWithJsonColumn

# Class: PostgresDatabaseWithJsonColumn

[postgres](../modules/postgres.md).PostgresDatabaseWithJsonColumn

## Hierarchy

- [*DatabaseWithJsonColumn*](json.databasewithjsoncolumn.md)

  ↳ **PostgresDatabaseWithJsonColumn**

## Table of contents

### Constructors

- [constructor](postgres.postgresdatabasewithjsoncolumn.md#constructor)

### Methods

- [formatJsonRef](postgres.postgresdatabasewithjsoncolumn.md#formatjsonref)
- [formatJsonRefText](postgres.postgresdatabasewithjsoncolumn.md#formatjsonreftext)
- [formatOnConflict](postgres.postgresdatabasewithjsoncolumn.md#formatonconflict)
- [parseJsonColumnValue](postgres.postgresdatabasewithjsoncolumn.md#parsejsoncolumnvalue)
- [parseRowWithJsonRefs](postgres.postgresdatabasewithjsoncolumn.md#parserowwithjsonrefs)
- [prepareUpdateJsonRefs](postgres.postgresdatabasewithjsoncolumn.md#prepareupdatejsonrefs)
- [returningJsonRefsAs](postgres.postgresdatabasewithjsoncolumn.md#returningjsonrefsas)
- [updateJsonColumn](postgres.postgresdatabasewithjsoncolumn.md#updatejsoncolumn)

## Constructors

### constructor

\+ **new PostgresDatabaseWithJsonColumn**(): [*PostgresDatabaseWithJsonColumn*](postgres.postgresdatabasewithjsoncolumn.md)

**Returns:** [*PostgresDatabaseWithJsonColumn*](postgres.postgresdatabasewithjsoncolumn.md)

Inherited from: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

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

Defined in: [postgres.ts:10](https://github.com/wholebuzz/db-json-column/blob/master/src/postgres.ts#L10)

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

Defined in: [postgres.ts:31](https://github.com/wholebuzz/db-json-column/blob/master/src/postgres.ts#L31)

___

### parseJsonColumnValue

▸ **parseJsonColumnValue**(`x`: *string*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | *string* |

**Returns:** *string*

Inherited from: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

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

▸ **updateJsonColumn**(`column`: *string*, `fields`: *string*[], `value`: *Record*<string, any\>, `options?`: [*UpdateJsonColumnOptions*](../interfaces/json.updatejsoncolumnoptions.md)): *object*

#### Parameters

| Name | Type |
| :------ | :------ |
| `column` | *string* |
| `fields` | *string*[] |
| `value` | *Record*<string, any\> |
| `options?` | [*UpdateJsonColumnOptions*](../interfaces/json.updatejsoncolumnoptions.md) |

**Returns:** *object*

| Name | Type |
| :------ | :------ |
| `binds` | *Record*<string, any\> |
| `update` | *string* |

Overrides: [DatabaseWithJsonColumn](json.databasewithjsoncolumn.md)

Defined in: [postgres.ts:14](https://github.com/wholebuzz/db-json-column/blob/master/src/postgres.ts#L14)
