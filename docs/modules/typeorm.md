[db-json-column](../README.md) / [Exports](../modules.md) / typeorm

# Module: typeorm

## Table of contents

### Functions

- [getDriverType](typeorm.md#getdrivertype)
- [parseRawJson](typeorm.md#parserawjson)
- [parseRowJson](typeorm.md#parserowjson)
- [selectAndParseJson](typeorm.md#selectandparsejson)
- [selectJson](typeorm.md#selectjson)
- [updateJson](typeorm.md#updatejson)

## Functions

### getDriverType

▸ `Const` **getDriverType**(`conn`: *Connection*): *string*

#### Parameters

| Name | Type |
| :------ | :------ |
| `conn` | *Connection* |

**Returns:** *string*

Defined in: [typeorm.ts:6](https://github.com/wholebuzz/db-json-column/blob/master/src/typeorm.ts#L6)

___

### parseRawJson

▸ **parseRawJson**<Entity\>(`query`: *SelectQueryBuilder*<Entity\>, `returningAs?`: *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\>): *Promise*<Record<string, any\>[]\>

#### Type parameters

| Name |
| :------ |
| `Entity` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | *SelectQueryBuilder*<Entity\> |
| `returningAs?` | *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\> |

**Returns:** *Promise*<Record<string, any\>[]\>

Defined in: [typeorm.ts:26](https://github.com/wholebuzz/db-json-column/blob/master/src/typeorm.ts#L26)

___

### parseRowJson

▸ **parseRowJson**(`conn`: Connection, `rows`: *Record*<string, any\>[], `returningAs?`: *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\>): *Record*<string, any\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `conn` | Connection |
| `rows` | *Record*<string, any\>[] |
| `returningAs?` | *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\> |

**Returns:** *Record*<string, any\>[]

Defined in: [typeorm.ts:33](https://github.com/wholebuzz/db-json-column/blob/master/src/typeorm.ts#L33)

___

### selectAndParseJson

▸ **selectAndParseJson**<Entity\>(`inputQuery`: *QueryBuilder*<Entity\>, `fields`: *string*[]): *Promise*<Record<string, any\>[]\>

#### Type parameters

| Name |
| :------ |
| `Entity` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputQuery` | *QueryBuilder*<Entity\> |
| `fields` | *string*[] |

**Returns:** *Promise*<Record<string, any\>[]\>

Defined in: [typeorm.ts:8](https://github.com/wholebuzz/db-json-column/blob/master/src/typeorm.ts#L8)

___

### selectJson

▸ **selectJson**<Entity\>(`query`: *QueryBuilder*<Entity\>, `fields`: *string*[]): { `fields`: *string*[] ; `query`: *SelectQueryBuilder*<Entity\> ; `returningAs`: *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\>  } \| { `query`: *SelectQueryBuilder*<Entity\> ; `returningAs`: *undefined*  }

#### Type parameters

| Name |
| :------ |
| `Entity` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | *QueryBuilder*<Entity\> |
| `fields` | *string*[] |

**Returns:** { `fields`: *string*[] ; `query`: *SelectQueryBuilder*<Entity\> ; `returningAs`: *Record*<string, [*JsonRef*](../interfaces/json.jsonref.md)\>  } \| { `query`: *SelectQueryBuilder*<Entity\> ; `returningAs`: *undefined*  }

Defined in: [typeorm.ts:16](https://github.com/wholebuzz/db-json-column/blob/master/src/typeorm.ts#L16)

___

### updateJson

▸ **updateJson**<Entity\>(`query`: *UpdateQueryBuilder*<Entity\>, `fields`: *string*[], `value`: *Record*<string, any\>, `options?`: [*UpdateJsonColumnOptions*](../interfaces/json.updatejsoncolumnoptions.md)): *UpdateQueryBuilder*<Entity\>

#### Type parameters

| Name |
| :------ |
| `Entity` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | *UpdateQueryBuilder*<Entity\> |
| `fields` | *string*[] |
| `value` | *Record*<string, any\> |
| `options?` | [*UpdateJsonColumnOptions*](../interfaces/json.updatejsoncolumnoptions.md) |

**Returns:** *UpdateQueryBuilder*<Entity\>

Defined in: [typeorm.ts:46](https://github.com/wholebuzz/db-json-column/blob/master/src/typeorm.ts#L46)
