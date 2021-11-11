[db-json-column](../README.md) / [Exports](../modules.md) / knex

# Module: knex

## Table of contents

### Functions

- [getClientType](knex.md#getclienttype)
- [parseRowJson](knex.md#parserowjson)
- [selectAndParseJson](knex.md#selectandparsejson)
- [selectJson](knex.md#selectjson)
- [updateJson](knex.md#updatejson)
- [updateOnConflict](knex.md#updateonconflict)
- [whereJson](knex.md#wherejson)

## Functions

### getClientType

▸ `Const` **getClientType**(`knex`: *Knex*<any, unknown[]\>): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `knex` | *Knex*<any, unknown[]\> |

**Returns:** *string*

Defined in: [knex.ts:5](https://github.com/wholebuzz/db-json-column/blob/master/src/knex.ts#L5)

___

### parseRowJson

▸ **parseRowJson**(`knex`: Knex, `rows`: *Record*<string, any\>[], `returningAs?`: *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\>): *Record*<string, any\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `knex` | Knex |
| `rows` | *Record*<string, any\>[] |
| `returningAs?` | *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\> |

**Returns:** *Record*<string, any\>[]

Defined in: [knex.ts:26](https://github.com/wholebuzz/db-json-column/blob/master/src/knex.ts#L26)

___

### selectAndParseJson

▸ **selectAndParseJson**(`knex`: Knex, `inputQuery`: Knex.QueryBuilder, `fields`: *string*[]): *Promise*<Record<string, any\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `knex` | Knex |
| `inputQuery` | Knex.QueryBuilder |
| `fields` | *string*[] |

**Returns:** *Promise*<Record<string, any\>[]\>

Defined in: [knex.ts:7](https://github.com/wholebuzz/db-json-column/blob/master/src/knex.ts#L7)

___

### selectJson

▸ **selectJson**(`knex`: Knex, `query`: Knex.QueryBuilder, `fields`: *string*[]): { `fields`: *string*[] ; `query`: *QueryBuilder*<any, DeferredKeySelection<any, string, ``true``, Raw<any\>[], boolean, {}, unknown\> \| DeferredKeySelection<any, never, ``true``, Raw<any\>[], ``false``, {}, never\>\> ; `returningAs`: *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\>  } \| { `query`: *QueryBuilder*<any, DeferredKeySelection<any, string, ``true``, {}, boolean, {}, unknown\> \| DeferredKeySelection<any, string, ``true``, {}, ``false``, {}, never\>\> ; `returningAs`: *undefined*  }

#### Parameters

| Name | Type |
| :------ | :------ |
| `knex` | Knex |
| `query` | Knex.QueryBuilder |
| `fields` | *string*[] |

**Returns:** { `fields`: *string*[] ; `query`: *QueryBuilder*<any, DeferredKeySelection<any, string, ``true``, Raw<any\>[], boolean, {}, unknown\> \| DeferredKeySelection<any, never, ``true``, Raw<any\>[], ``false``, {}, never\>\> ; `returningAs`: *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\>  } \| { `query`: *QueryBuilder*<any, DeferredKeySelection<any, string, ``true``, {}, boolean, {}, unknown\> \| DeferredKeySelection<any, string, ``true``, {}, ``false``, {}, never\>\> ; `returningAs`: *undefined*  }

Defined in: [knex.ts:16](https://github.com/wholebuzz/db-json-column/blob/master/src/knex.ts#L16)

___

### updateJson

▸ **updateJson**(`knex`: Knex, `query`: Knex.QueryBuilder, `fields`: *string*[], `value`: *Record*<string, any\>, `options?`: [*UpdateJsonColumnOptions*](../interfaces/json.updatejsoncolumnoptions.md)): *QueryBuilder*<any, number\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `knex` | Knex |
| `query` | Knex.QueryBuilder |
| `fields` | *string*[] |
| `value` | *Record*<string, any\> |
| `options?` | [*UpdateJsonColumnOptions*](../interfaces/json.updatejsoncolumnoptions.md) |

**Returns:** *QueryBuilder*<any, number\>

Defined in: [knex.ts:39](https://github.com/wholebuzz/db-json-column/blob/master/src/knex.ts#L39)

___

### updateOnConflict

▸ **updateOnConflict**(`knex`: Knex, `query`: Knex.QueryBuilder, `options`: [*FormatOnConflictOptions*](../interfaces/json.formatonconflictoptions.md)): *QueryBuilder*<any, any\> \| *Raw*<any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `knex` | Knex |
| `query` | Knex.QueryBuilder |
| `options` | [*FormatOnConflictOptions*](../interfaces/json.formatonconflictoptions.md) |

**Returns:** *QueryBuilder*<any, any\> \| *Raw*<any\>

Defined in: [knex.ts:96](https://github.com/wholebuzz/db-json-column/blob/master/src/knex.ts#L96)

___

### whereJson

▸ **whereJson**(`knex`: Knex, `query`: Knex.QueryBuilder, `where`: *any*[]): *QueryBuilder*<any, any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `knex` | Knex |
| `query` | Knex.QueryBuilder |
| `where` | *any*[] |

**Returns:** *QueryBuilder*<any, any\>

Defined in: [knex.ts:69](https://github.com/wholebuzz/db-json-column/blob/master/src/knex.ts#L69)
