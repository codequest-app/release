import { n as __exportAll } from "./chunk-BO8t30hb.js";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/entity.js
const entityKind = Symbol.for("drizzle:entityKind");
function is(value, type) {
	if (!value || typeof value !== "object") return false;
	if (value instanceof type) return true;
	if (!Object.prototype.hasOwnProperty.call(type, entityKind)) throw new Error(`Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`);
	let cls = Object.getPrototypeOf(value).constructor;
	if (cls) while (cls) {
		if (entityKind in cls && cls[entityKind] === type[entityKind]) return true;
		cls = Object.getPrototypeOf(cls);
	}
	return false;
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/column.js
var Column = class {
	constructor(table, config) {
		this.table = table;
		this.config = config;
		this.name = config.name;
		this.keyAsName = config.keyAsName;
		this.notNull = config.notNull;
		this.default = config.default;
		this.defaultFn = config.defaultFn;
		this.onUpdateFn = config.onUpdateFn;
		this.hasDefault = config.hasDefault;
		this.primary = config.primaryKey;
		this.isUnique = config.isUnique;
		this.uniqueName = config.uniqueName;
		this.uniqueType = config.uniqueType;
		this.dataType = config.dataType;
		this.columnType = config.columnType;
		this.generated = config.generated;
		this.generatedIdentity = config.generatedIdentity;
	}
	static [entityKind] = "Column";
	name;
	keyAsName;
	primary;
	notNull;
	default;
	defaultFn;
	onUpdateFn;
	hasDefault;
	isUnique;
	uniqueName;
	uniqueType;
	dataType;
	columnType;
	enumValues = void 0;
	generated = void 0;
	generatedIdentity = void 0;
	config;
	mapFromDriverValue(value) {
		return value;
	}
	mapToDriverValue(value) {
		return value;
	}
	shouldDisableInsert() {
		return this.config.generated !== void 0 && this.config.generated.type !== "byDefault";
	}
};
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/column-builder.js
var ColumnBuilder = class {
	static [entityKind] = "ColumnBuilder";
	config;
	constructor(name, dataType, columnType) {
		this.config = {
			name,
			keyAsName: name === "",
			notNull: false,
			default: void 0,
			hasDefault: false,
			primaryKey: false,
			isUnique: false,
			uniqueName: void 0,
			uniqueType: void 0,
			dataType,
			columnType,
			generated: void 0
		};
	}
	/**
	* Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
	*
	* @example
	* ```ts
	* const users = pgTable('users', {
	* 	id: integer('id').$type<UserId>().primaryKey(),
	* 	details: json('details').$type<UserDetails>().notNull(),
	* });
	* ```
	*/
	$type() {
		return this;
	}
	/**
	* Adds a `not null` clause to the column definition.
	*
	* Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
	*/
	notNull() {
		this.config.notNull = true;
		return this;
	}
	/**
	* Adds a `default <value>` clause to the column definition.
	*
	* Affects the `insert` model of the table - columns *with* `default` are optional on insert.
	*
	* If you need to set a dynamic default value, use {@link $defaultFn} instead.
	*/
	default(value) {
		this.config.default = value;
		this.config.hasDefault = true;
		return this;
	}
	/**
	* Adds a dynamic default value to the column.
	* The function will be called when the row is inserted, and the returned value will be used as the column value.
	*
	* **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
	*/
	$defaultFn(fn) {
		this.config.defaultFn = fn;
		this.config.hasDefault = true;
		return this;
	}
	/**
	* Alias for {@link $defaultFn}.
	*/
	$default = this.$defaultFn;
	/**
	* Adds a dynamic update value to the column.
	* The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
	* If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
	*
	* **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
	*/
	$onUpdateFn(fn) {
		this.config.onUpdateFn = fn;
		this.config.hasDefault = true;
		return this;
	}
	/**
	* Alias for {@link $onUpdateFn}.
	*/
	$onUpdate = this.$onUpdateFn;
	/**
	* Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
	*
	* In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
	*/
	primaryKey() {
		this.config.primaryKey = true;
		this.config.notNull = true;
		return this;
	}
	/** @internal Sets the name of the column to the key within the table definition if a name was not given. */
	setName(name) {
		if (this.config.name !== "") return;
		this.config.name = name;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/table.utils.js
const TableName = Symbol.for("drizzle:Name");
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/pg-core/columns/enum.js
const isPgEnumSym = Symbol.for("drizzle:isPgEnum");
function isPgEnum(obj) {
	return !!obj && typeof obj === "function" && isPgEnumSym in obj && obj[isPgEnumSym] === true;
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/subquery.js
var Subquery = class {
	static [entityKind] = "Subquery";
	constructor(sql, fields, alias, isWith = false, usedTables = []) {
		this._ = {
			brand: "Subquery",
			sql,
			selectedFields: fields,
			alias,
			isWith,
			usedTables
		};
	}
};
var WithSubquery = class extends Subquery {
	static [entityKind] = "WithSubquery";
};
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/tracing.js
const tracer = { startActiveSpan(name, fn) {
	return fn();
} };
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/view-common.js
const ViewBaseConfig = Symbol.for("drizzle:ViewBaseConfig");
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/table.js
const Schema = Symbol.for("drizzle:Schema");
const Columns = Symbol.for("drizzle:Columns");
const ExtraConfigColumns = Symbol.for("drizzle:ExtraConfigColumns");
const OriginalName = Symbol.for("drizzle:OriginalName");
const BaseName = Symbol.for("drizzle:BaseName");
const IsAlias = Symbol.for("drizzle:IsAlias");
const ExtraConfigBuilder = Symbol.for("drizzle:ExtraConfigBuilder");
const IsDrizzleTable = Symbol.for("drizzle:IsDrizzleTable");
var Table = class {
	static [entityKind] = "Table";
	/** @internal */
	static Symbol = {
		Name: TableName,
		Schema,
		OriginalName,
		Columns,
		ExtraConfigColumns,
		BaseName,
		IsAlias,
		ExtraConfigBuilder
	};
	/**
	* @internal
	* Can be changed if the table is aliased.
	*/
	[TableName];
	/**
	* @internal
	* Used to store the original name of the table, before any aliasing.
	*/
	[OriginalName];
	/** @internal */
	[Schema];
	/** @internal */
	[Columns];
	/** @internal */
	[ExtraConfigColumns];
	/**
	*  @internal
	* Used to store the table name before the transformation via the `tableCreator` functions.
	*/
	[BaseName];
	/** @internal */
	[IsAlias] = false;
	/** @internal */
	[IsDrizzleTable] = true;
	/** @internal */
	[ExtraConfigBuilder] = void 0;
	constructor(name, schema, baseName) {
		this[TableName] = this[OriginalName] = name;
		this[Schema] = schema;
		this[BaseName] = baseName;
	}
};
function getTableName(table) {
	return table[TableName];
}
function getTableUniqueName(table) {
	return `${table[Schema] ?? "public"}.${table[TableName]}`;
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sql/sql.js
function isSQLWrapper(value) {
	return value !== null && value !== void 0 && typeof value.getSQL === "function";
}
function mergeQueries(queries) {
	const result = {
		sql: "",
		params: []
	};
	for (const query of queries) {
		result.sql += query.sql;
		result.params.push(...query.params);
		if (query.typings?.length) {
			if (!result.typings) result.typings = [];
			result.typings.push(...query.typings);
		}
	}
	return result;
}
var StringChunk = class {
	static [entityKind] = "StringChunk";
	value;
	constructor(value) {
		this.value = Array.isArray(value) ? value : [value];
	}
	getSQL() {
		return new SQL([this]);
	}
};
var SQL = class SQL {
	constructor(queryChunks) {
		this.queryChunks = queryChunks;
		for (const chunk of queryChunks) if (is(chunk, Table)) {
			const schemaName = chunk[Table.Symbol.Schema];
			this.usedTables.push(schemaName === void 0 ? chunk[Table.Symbol.Name] : schemaName + "." + chunk[Table.Symbol.Name]);
		}
	}
	static [entityKind] = "SQL";
	/** @internal */
	decoder = noopDecoder;
	shouldInlineParams = false;
	/** @internal */
	usedTables = [];
	append(query) {
		this.queryChunks.push(...query.queryChunks);
		return this;
	}
	toQuery(config) {
		return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
			const query = this.buildQueryFromSourceParams(this.queryChunks, config);
			span?.setAttributes({
				"drizzle.query.text": query.sql,
				"drizzle.query.params": JSON.stringify(query.params)
			});
			return query;
		});
	}
	buildQueryFromSourceParams(chunks, _config) {
		const config = Object.assign({}, _config, {
			inlineParams: _config.inlineParams || this.shouldInlineParams,
			paramStartIndex: _config.paramStartIndex || { value: 0 }
		});
		const { casing, escapeName, escapeParam, prepareTyping, inlineParams, paramStartIndex } = config;
		return mergeQueries(chunks.map((chunk) => {
			if (is(chunk, StringChunk)) return {
				sql: chunk.value.join(""),
				params: []
			};
			if (is(chunk, Name)) return {
				sql: escapeName(chunk.value),
				params: []
			};
			if (chunk === void 0) return {
				sql: "",
				params: []
			};
			if (Array.isArray(chunk)) {
				const result = [new StringChunk("(")];
				for (const [i, p] of chunk.entries()) {
					result.push(p);
					if (i < chunk.length - 1) result.push(new StringChunk(", "));
				}
				result.push(new StringChunk(")"));
				return this.buildQueryFromSourceParams(result, config);
			}
			if (is(chunk, SQL)) return this.buildQueryFromSourceParams(chunk.queryChunks, {
				...config,
				inlineParams: inlineParams || chunk.shouldInlineParams
			});
			if (is(chunk, Table)) {
				const schemaName = chunk[Table.Symbol.Schema];
				const tableName = chunk[Table.Symbol.Name];
				return {
					sql: schemaName === void 0 || chunk[IsAlias] ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
					params: []
				};
			}
			if (is(chunk, Column)) {
				const columnName = casing.getColumnCasing(chunk);
				if (_config.invokeSource === "indexes") return {
					sql: escapeName(columnName),
					params: []
				};
				const schemaName = chunk.table[Table.Symbol.Schema];
				return {
					sql: chunk.table[IsAlias] || schemaName === void 0 ? escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName) : escapeName(schemaName) + "." + escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName),
					params: []
				};
			}
			if (is(chunk, View)) {
				const schemaName = chunk[ViewBaseConfig].schema;
				const viewName = chunk[ViewBaseConfig].name;
				return {
					sql: schemaName === void 0 || chunk[ViewBaseConfig].isAlias ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
					params: []
				};
			}
			if (is(chunk, Param)) {
				if (is(chunk.value, Placeholder)) return {
					sql: escapeParam(paramStartIndex.value++, chunk),
					params: [chunk],
					typings: ["none"]
				};
				const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
				if (is(mappedValue, SQL)) return this.buildQueryFromSourceParams([mappedValue], config);
				if (inlineParams) return {
					sql: this.mapInlineParam(mappedValue, config),
					params: []
				};
				let typings = ["none"];
				if (prepareTyping) typings = [prepareTyping(chunk.encoder)];
				return {
					sql: escapeParam(paramStartIndex.value++, mappedValue),
					params: [mappedValue],
					typings
				};
			}
			if (is(chunk, Placeholder)) return {
				sql: escapeParam(paramStartIndex.value++, chunk),
				params: [chunk],
				typings: ["none"]
			};
			if (is(chunk, SQL.Aliased) && chunk.fieldAlias !== void 0) return {
				sql: escapeName(chunk.fieldAlias),
				params: []
			};
			if (is(chunk, Subquery)) {
				if (chunk._.isWith) return {
					sql: escapeName(chunk._.alias),
					params: []
				};
				return this.buildQueryFromSourceParams([
					new StringChunk("("),
					chunk._.sql,
					new StringChunk(") "),
					new Name(chunk._.alias)
				], config);
			}
			if (isPgEnum(chunk)) {
				if (chunk.schema) return {
					sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName),
					params: []
				};
				return {
					sql: escapeName(chunk.enumName),
					params: []
				};
			}
			if (isSQLWrapper(chunk)) {
				if (chunk.shouldOmitSQLParens?.()) return this.buildQueryFromSourceParams([chunk.getSQL()], config);
				return this.buildQueryFromSourceParams([
					new StringChunk("("),
					chunk.getSQL(),
					new StringChunk(")")
				], config);
			}
			if (inlineParams) return {
				sql: this.mapInlineParam(chunk, config),
				params: []
			};
			return {
				sql: escapeParam(paramStartIndex.value++, chunk),
				params: [chunk],
				typings: ["none"]
			};
		}));
	}
	mapInlineParam(chunk, { escapeString }) {
		if (chunk === null) return "null";
		if (typeof chunk === "number" || typeof chunk === "boolean") return chunk.toString();
		if (typeof chunk === "string") return escapeString(chunk);
		if (typeof chunk === "object") {
			const mappedValueAsString = chunk.toString();
			if (mappedValueAsString === "[object Object]") return escapeString(JSON.stringify(chunk));
			return escapeString(mappedValueAsString);
		}
		throw new Error("Unexpected param value: " + chunk);
	}
	getSQL() {
		return this;
	}
	as(alias) {
		if (alias === void 0) return this;
		return new SQL.Aliased(this, alias);
	}
	mapWith(decoder) {
		this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
		return this;
	}
	inlineParams() {
		this.shouldInlineParams = true;
		return this;
	}
	/**
	* This method is used to conditionally include a part of the query.
	*
	* @param condition - Condition to check
	* @returns itself if the condition is `true`, otherwise `undefined`
	*/
	if(condition) {
		return condition ? this : void 0;
	}
};
var Name = class {
	constructor(value) {
		this.value = value;
	}
	static [entityKind] = "Name";
	brand;
	getSQL() {
		return new SQL([this]);
	}
};
function isDriverValueEncoder(value) {
	return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
}
const noopDecoder = { mapFromDriverValue: (value) => value };
const noopEncoder = { mapToDriverValue: (value) => value };
({
	...noopDecoder,
	...noopEncoder
});
var Param = class {
	/**
	* @param value - Parameter value
	* @param encoder - Encoder to convert the value to a driver parameter
	*/
	constructor(value, encoder = noopEncoder) {
		this.value = value;
		this.encoder = encoder;
	}
	static [entityKind] = "Param";
	brand;
	getSQL() {
		return new SQL([this]);
	}
};
function sql(strings, ...params) {
	const queryChunks = [];
	if (params.length > 0 || strings.length > 0 && strings[0] !== "") queryChunks.push(new StringChunk(strings[0]));
	for (const [paramIndex, param2] of params.entries()) queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
	return new SQL(queryChunks);
}
((sql2) => {
	function empty() {
		return new SQL([]);
	}
	sql2.empty = empty;
	function fromList(list) {
		return new SQL(list);
	}
	sql2.fromList = fromList;
	function raw(str) {
		return new SQL([new StringChunk(str)]);
	}
	sql2.raw = raw;
	function join(chunks, separator) {
		const result = [];
		for (const [i, chunk] of chunks.entries()) {
			if (i > 0 && separator !== void 0) result.push(separator);
			result.push(chunk);
		}
		return new SQL(result);
	}
	sql2.join = join;
	function identifier(value) {
		return new Name(value);
	}
	sql2.identifier = identifier;
	function placeholder2(name2) {
		return new Placeholder(name2);
	}
	sql2.placeholder = placeholder2;
	function param2(value, encoder) {
		return new Param(value, encoder);
	}
	sql2.param = param2;
})(sql || (sql = {}));
((SQL2) => {
	class Aliased {
		constructor(sql2, fieldAlias) {
			this.sql = sql2;
			this.fieldAlias = fieldAlias;
		}
		static [entityKind] = "SQL.Aliased";
		/** @internal */
		isSelectionField = false;
		getSQL() {
			return this.sql;
		}
		/** @internal */
		clone() {
			return new Aliased(this.sql, this.fieldAlias);
		}
	}
	SQL2.Aliased = Aliased;
})(SQL || (SQL = {}));
var Placeholder = class {
	constructor(name2) {
		this.name = name2;
	}
	static [entityKind] = "Placeholder";
	getSQL() {
		return new SQL([this]);
	}
};
function fillPlaceholders(params, values) {
	return params.map((p) => {
		if (is(p, Placeholder)) {
			if (!(p.name in values)) throw new Error(`No value for placeholder "${p.name}" was provided`);
			return values[p.name];
		}
		if (is(p, Param) && is(p.value, Placeholder)) {
			if (!(p.value.name in values)) throw new Error(`No value for placeholder "${p.value.name}" was provided`);
			return p.encoder.mapToDriverValue(values[p.value.name]);
		}
		return p;
	});
}
const IsDrizzleView = Symbol.for("drizzle:IsDrizzleView");
var View = class {
	static [entityKind] = "View";
	/** @internal */
	[ViewBaseConfig];
	/** @internal */
	[IsDrizzleView] = true;
	constructor({ name: name2, schema, selectedFields, query }) {
		this[ViewBaseConfig] = {
			name: name2,
			originalName: name2,
			schema,
			selectedFields,
			query,
			isExisting: !query,
			isAlias: false
		};
	}
	getSQL() {
		return new SQL([this]);
	}
};
Column.prototype.getSQL = function() {
	return new SQL([this]);
};
Table.prototype.getSQL = function() {
	return new SQL([this]);
};
Subquery.prototype.getSQL = function() {
	return new SQL([this]);
};
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/utils.js
function mapResultRow(columns, row, joinsNotNullableMap) {
	const nullifyMap = {};
	const result = columns.reduce((result2, { path, field }, columnIndex) => {
		let decoder;
		if (is(field, Column)) decoder = field;
		else if (is(field, SQL)) decoder = field.decoder;
		else if (is(field, Subquery)) decoder = field._.sql.decoder;
		else decoder = field.sql.decoder;
		let node = result2;
		for (const [pathChunkIndex, pathChunk] of path.entries()) if (pathChunkIndex < path.length - 1) {
			if (!(pathChunk in node)) node[pathChunk] = {};
			node = node[pathChunk];
		} else {
			const rawValue = row[columnIndex];
			const value = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
			if (joinsNotNullableMap && is(field, Column) && path.length === 2) {
				const objectName = path[0];
				if (!(objectName in nullifyMap)) nullifyMap[objectName] = value === null ? getTableName(field.table) : false;
				else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== getTableName(field.table)) nullifyMap[objectName] = false;
			}
		}
		return result2;
	}, {});
	if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
		for (const [objectName, tableName] of Object.entries(nullifyMap)) if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) result[objectName] = null;
	}
	return result;
}
function orderSelectedFields(fields, pathPrefix) {
	return Object.entries(fields).reduce((result, [name, field]) => {
		if (typeof name !== "string") return result;
		const newPath = pathPrefix ? [...pathPrefix, name] : [name];
		if (is(field, Column) || is(field, SQL) || is(field, SQL.Aliased) || is(field, Subquery)) result.push({
			path: newPath,
			field
		});
		else if (is(field, Table)) result.push(...orderSelectedFields(field[Table.Symbol.Columns], newPath));
		else result.push(...orderSelectedFields(field, newPath));
		return result;
	}, []);
}
function haveSameKeys(left, right) {
	const leftKeys = Object.keys(left);
	const rightKeys = Object.keys(right);
	if (leftKeys.length !== rightKeys.length) return false;
	for (const [index, key] of leftKeys.entries()) if (key !== rightKeys[index]) return false;
	return true;
}
function mapUpdateSet(table, values) {
	const entries = Object.entries(values).filter(([, value]) => value !== void 0).map(([key, value]) => {
		if (is(value, SQL) || is(value, Column)) return [key, value];
		else return [key, new Param(value, table[Table.Symbol.Columns][key])];
	});
	if (entries.length === 0) throw new Error("No values to set");
	return Object.fromEntries(entries);
}
function applyMixins(baseClass, extendedClasses) {
	for (const extendedClass of extendedClasses) for (const name of Object.getOwnPropertyNames(extendedClass.prototype)) {
		if (name === "constructor") continue;
		Object.defineProperty(baseClass.prototype, name, Object.getOwnPropertyDescriptor(extendedClass.prototype, name) || /* @__PURE__ */ Object.create(null));
	}
}
function getTableColumns(table) {
	return table[Table.Symbol.Columns];
}
function getTableLikeName(table) {
	return is(table, Subquery) ? table._.alias : is(table, View) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : table[Table.Symbol.IsAlias] ? table[Table.Symbol.Name] : table[Table.Symbol.BaseName];
}
function getColumnNameAndConfig(a, b) {
	return {
		name: typeof a === "string" && a.length > 0 ? a : "",
		config: typeof a === "object" ? a : b
	};
}
function isConfig(data) {
	if (typeof data !== "object" || data === null) return false;
	if (data.constructor.name !== "Object") return false;
	if ("logger" in data) {
		const type = typeof data["logger"];
		if (type !== "boolean" && (type !== "object" || typeof data["logger"]["logQuery"] !== "function") && type !== "undefined") return false;
		return true;
	}
	if ("schema" in data) {
		const type = typeof data["schema"];
		if (type !== "object" && type !== "undefined") return false;
		return true;
	}
	if ("casing" in data) {
		const type = typeof data["casing"];
		if (type !== "string" && type !== "undefined") return false;
		return true;
	}
	if ("mode" in data) {
		if (data["mode"] !== "default" || data["mode"] !== "planetscale" || data["mode"] !== void 0) return false;
		return true;
	}
	if ("connection" in data) {
		const type = typeof data["connection"];
		if (type !== "string" && type !== "object" && type !== "undefined") return false;
		return true;
	}
	if ("client" in data) {
		const type = typeof data["client"];
		if (type !== "object" && type !== "function" && type !== "undefined") return false;
		return true;
	}
	if (Object.keys(data).length === 0) return true;
	return false;
}
const textDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder();
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/foreign-keys.js
var ForeignKeyBuilder$1 = class {
	static [entityKind] = "MySqlForeignKeyBuilder";
	/** @internal */
	reference;
	/** @internal */
	_onUpdate;
	/** @internal */
	_onDelete;
	constructor(config, actions) {
		this.reference = () => {
			const { name, columns, foreignColumns } = config();
			return {
				name,
				columns,
				foreignTable: foreignColumns[0].table,
				foreignColumns
			};
		};
		if (actions) {
			this._onUpdate = actions.onUpdate;
			this._onDelete = actions.onDelete;
		}
	}
	onUpdate(action) {
		this._onUpdate = action;
		return this;
	}
	onDelete(action) {
		this._onDelete = action;
		return this;
	}
	/** @internal */
	build(table) {
		return new ForeignKey$1(table, this);
	}
};
var ForeignKey$1 = class {
	constructor(table, builder) {
		this.table = table;
		this.reference = builder.reference;
		this.onUpdate = builder._onUpdate;
		this.onDelete = builder._onDelete;
	}
	static [entityKind] = "MySqlForeignKey";
	reference;
	onUpdate;
	onDelete;
	getName() {
		const { name, columns, foreignColumns } = this.reference();
		const columnNames = columns.map((column) => column.name);
		const foreignColumnNames = foreignColumns.map((column) => column.name);
		const chunks = [
			this.table[TableName],
			...columnNames,
			foreignColumns[0].table[TableName],
			...foreignColumnNames
		];
		return name ?? `${chunks.join("_")}_fk`;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/unique-constraint.js
function uniqueKeyName$1(table, columns) {
	return `${table[TableName]}_${columns.join("_")}_unique`;
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/common.js
var MySqlColumnBuilder = class extends ColumnBuilder {
	static [entityKind] = "MySqlColumnBuilder";
	foreignKeyConfigs = [];
	references(ref, actions = {}) {
		this.foreignKeyConfigs.push({
			ref,
			actions
		});
		return this;
	}
	unique(name) {
		this.config.isUnique = true;
		this.config.uniqueName = name;
		return this;
	}
	generatedAlwaysAs(as, config) {
		this.config.generated = {
			as,
			type: "always",
			mode: config?.mode ?? "virtual"
		};
		return this;
	}
	/** @internal */
	buildForeignKeys(column, table) {
		return this.foreignKeyConfigs.map(({ ref, actions }) => {
			return ((ref2, actions2) => {
				const builder = new ForeignKeyBuilder$1(() => {
					const foreignColumn = ref2();
					return {
						columns: [column],
						foreignColumns: [foreignColumn]
					};
				});
				if (actions2.onUpdate) builder.onUpdate(actions2.onUpdate);
				if (actions2.onDelete) builder.onDelete(actions2.onDelete);
				return builder.build(table);
			})(ref, actions);
		});
	}
};
var MySqlColumn = class extends Column {
	constructor(table, config) {
		if (!config.uniqueName) config.uniqueName = uniqueKeyName$1(table, [config.name]);
		super(table, config);
		this.table = table;
	}
	static [entityKind] = "MySqlColumn";
};
var MySqlColumnBuilderWithAutoIncrement = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlColumnBuilderWithAutoIncrement";
	constructor(name, dataType, columnType) {
		super(name, dataType, columnType);
		this.config.autoIncrement = false;
	}
	autoincrement() {
		this.config.autoIncrement = true;
		this.config.hasDefault = true;
		return this;
	}
};
var MySqlColumnWithAutoIncrement = class extends MySqlColumn {
	static [entityKind] = "MySqlColumnWithAutoIncrement";
	autoIncrement = this.config.autoIncrement;
};
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/bigint.js
var MySqlBigInt53Builder = class extends MySqlColumnBuilderWithAutoIncrement {
	static [entityKind] = "MySqlBigInt53Builder";
	constructor(name, unsigned = false) {
		super(name, "number", "MySqlBigInt53");
		this.config.unsigned = unsigned;
	}
	/** @internal */
	build(table) {
		return new MySqlBigInt53(table, this.config);
	}
};
var MySqlBigInt53 = class extends MySqlColumnWithAutoIncrement {
	static [entityKind] = "MySqlBigInt53";
	getSQLType() {
		return `bigint${this.config.unsigned ? " unsigned" : ""}`;
	}
	mapFromDriverValue(value) {
		if (typeof value === "number") return value;
		return Number(value);
	}
};
var MySqlBigInt64Builder = class extends MySqlColumnBuilderWithAutoIncrement {
	static [entityKind] = "MySqlBigInt64Builder";
	constructor(name, unsigned = false) {
		super(name, "bigint", "MySqlBigInt64");
		this.config.unsigned = unsigned;
	}
	/** @internal */
	build(table) {
		return new MySqlBigInt64(table, this.config);
	}
};
var MySqlBigInt64 = class extends MySqlColumnWithAutoIncrement {
	static [entityKind] = "MySqlBigInt64";
	getSQLType() {
		return `bigint${this.config.unsigned ? " unsigned" : ""}`;
	}
	mapFromDriverValue(value) {
		return BigInt(value);
	}
};
function bigint(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	if (config.mode === "number") return new MySqlBigInt53Builder(name, config.unsigned);
	return new MySqlBigInt64Builder(name, config.unsigned);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/binary.js
var MySqlBinaryBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlBinaryBuilder";
	constructor(name, length) {
		super(name, "string", "MySqlBinary");
		this.config.length = length;
	}
	/** @internal */
	build(table) {
		return new MySqlBinary(table, this.config);
	}
};
var MySqlBinary = class extends MySqlColumn {
	static [entityKind] = "MySqlBinary";
	length = this.config.length;
	mapFromDriverValue(value) {
		if (typeof value === "string") return value;
		if (Buffer.isBuffer(value)) return value.toString();
		const str = [];
		for (const v of value) str.push(v === 49 ? "1" : "0");
		return str.join("");
	}
	getSQLType() {
		return this.length === void 0 ? `binary` : `binary(${this.length})`;
	}
};
function binary(a, b = {}) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlBinaryBuilder(name, config.length);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/boolean.js
var MySqlBooleanBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlBooleanBuilder";
	constructor(name) {
		super(name, "boolean", "MySqlBoolean");
	}
	/** @internal */
	build(table) {
		return new MySqlBoolean(table, this.config);
	}
};
var MySqlBoolean = class extends MySqlColumn {
	static [entityKind] = "MySqlBoolean";
	getSQLType() {
		return "boolean";
	}
	mapFromDriverValue(value) {
		if (typeof value === "boolean") return value;
		return value === 1;
	}
};
function boolean(name) {
	return new MySqlBooleanBuilder(name ?? "");
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/char.js
var MySqlCharBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlCharBuilder";
	constructor(name, config) {
		super(name, "string", "MySqlChar");
		this.config.length = config.length;
		this.config.enum = config.enum;
	}
	/** @internal */
	build(table) {
		return new MySqlChar(table, this.config);
	}
};
var MySqlChar = class extends MySqlColumn {
	static [entityKind] = "MySqlChar";
	length = this.config.length;
	enumValues = this.config.enum;
	getSQLType() {
		return this.length === void 0 ? `char` : `char(${this.length})`;
	}
};
function char(a, b = {}) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlCharBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/custom.js
var MySqlCustomColumnBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlCustomColumnBuilder";
	constructor(name, fieldConfig, customTypeParams) {
		super(name, "custom", "MySqlCustomColumn");
		this.config.fieldConfig = fieldConfig;
		this.config.customTypeParams = customTypeParams;
	}
	/** @internal */
	build(table) {
		return new MySqlCustomColumn(table, this.config);
	}
};
var MySqlCustomColumn = class extends MySqlColumn {
	static [entityKind] = "MySqlCustomColumn";
	sqlName;
	mapTo;
	mapFrom;
	constructor(table, config) {
		super(table, config);
		this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
		this.mapTo = config.customTypeParams.toDriver;
		this.mapFrom = config.customTypeParams.fromDriver;
	}
	getSQLType() {
		return this.sqlName;
	}
	mapFromDriverValue(value) {
		return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
	}
	mapToDriverValue(value) {
		return typeof this.mapTo === "function" ? this.mapTo(value) : value;
	}
};
function customType$1(customTypeParams) {
	return (a, b) => {
		const { name, config } = getColumnNameAndConfig(a, b);
		return new MySqlCustomColumnBuilder(name, config, customTypeParams);
	};
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/date.js
var MySqlDateBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlDateBuilder";
	constructor(name) {
		super(name, "date", "MySqlDate");
	}
	/** @internal */
	build(table) {
		return new MySqlDate(table, this.config);
	}
};
var MySqlDate = class extends MySqlColumn {
	static [entityKind] = "MySqlDate";
	constructor(table, config) {
		super(table, config);
	}
	getSQLType() {
		return `date`;
	}
	mapFromDriverValue(value) {
		return new Date(value);
	}
};
var MySqlDateStringBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlDateStringBuilder";
	constructor(name) {
		super(name, "string", "MySqlDateString");
	}
	/** @internal */
	build(table) {
		return new MySqlDateString(table, this.config);
	}
};
var MySqlDateString = class extends MySqlColumn {
	static [entityKind] = "MySqlDateString";
	constructor(table, config) {
		super(table, config);
	}
	getSQLType() {
		return `date`;
	}
};
function date(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	if (config?.mode === "string") return new MySqlDateStringBuilder(name);
	return new MySqlDateBuilder(name);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/datetime.js
var MySqlDateTimeBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlDateTimeBuilder";
	constructor(name, config) {
		super(name, "date", "MySqlDateTime");
		this.config.fsp = config?.fsp;
	}
	/** @internal */
	build(table) {
		return new MySqlDateTime(table, this.config);
	}
};
var MySqlDateTime = class extends MySqlColumn {
	static [entityKind] = "MySqlDateTime";
	fsp;
	constructor(table, config) {
		super(table, config);
		this.fsp = config.fsp;
	}
	getSQLType() {
		return `datetime${this.fsp === void 0 ? "" : `(${this.fsp})`}`;
	}
	mapToDriverValue(value) {
		return value.toISOString().replace("T", " ").replace("Z", "");
	}
	mapFromDriverValue(value) {
		return /* @__PURE__ */ new Date(value.replace(" ", "T") + "Z");
	}
};
var MySqlDateTimeStringBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlDateTimeStringBuilder";
	constructor(name, config) {
		super(name, "string", "MySqlDateTimeString");
		this.config.fsp = config?.fsp;
	}
	/** @internal */
	build(table) {
		return new MySqlDateTimeString(table, this.config);
	}
};
var MySqlDateTimeString = class extends MySqlColumn {
	static [entityKind] = "MySqlDateTimeString";
	fsp;
	constructor(table, config) {
		super(table, config);
		this.fsp = config.fsp;
	}
	getSQLType() {
		return `datetime${this.fsp === void 0 ? "" : `(${this.fsp})`}`;
	}
};
function datetime(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	if (config?.mode === "string") return new MySqlDateTimeStringBuilder(name, config);
	return new MySqlDateTimeBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/decimal.js
var MySqlDecimalBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
	static [entityKind] = "MySqlDecimalBuilder";
	constructor(name, config) {
		super(name, "string", "MySqlDecimal");
		this.config.precision = config?.precision;
		this.config.scale = config?.scale;
		this.config.unsigned = config?.unsigned;
	}
	/** @internal */
	build(table) {
		return new MySqlDecimal(table, this.config);
	}
};
var MySqlDecimal = class extends MySqlColumnWithAutoIncrement {
	static [entityKind] = "MySqlDecimal";
	precision = this.config.precision;
	scale = this.config.scale;
	unsigned = this.config.unsigned;
	mapFromDriverValue(value) {
		if (typeof value === "string") return value;
		return String(value);
	}
	getSQLType() {
		let type = "";
		if (this.precision !== void 0 && this.scale !== void 0) type += `decimal(${this.precision},${this.scale})`;
		else if (this.precision === void 0) type += "decimal";
		else type += `decimal(${this.precision})`;
		type = type === "decimal(10,0)" || type === "decimal(10)" ? "decimal" : type;
		return this.unsigned ? `${type} unsigned` : type;
	}
};
var MySqlDecimalNumberBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
	static [entityKind] = "MySqlDecimalNumberBuilder";
	constructor(name, config) {
		super(name, "number", "MySqlDecimalNumber");
		this.config.precision = config?.precision;
		this.config.scale = config?.scale;
		this.config.unsigned = config?.unsigned;
	}
	/** @internal */
	build(table) {
		return new MySqlDecimalNumber(table, this.config);
	}
};
var MySqlDecimalNumber = class extends MySqlColumnWithAutoIncrement {
	static [entityKind] = "MySqlDecimalNumber";
	precision = this.config.precision;
	scale = this.config.scale;
	unsigned = this.config.unsigned;
	mapFromDriverValue(value) {
		if (typeof value === "number") return value;
		return Number(value);
	}
	mapToDriverValue = String;
	getSQLType() {
		let type = "";
		if (this.precision !== void 0 && this.scale !== void 0) type += `decimal(${this.precision},${this.scale})`;
		else if (this.precision === void 0) type += "decimal";
		else type += `decimal(${this.precision})`;
		type = type === "decimal(10,0)" || type === "decimal(10)" ? "decimal" : type;
		return this.unsigned ? `${type} unsigned` : type;
	}
};
var MySqlDecimalBigIntBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
	static [entityKind] = "MySqlDecimalBigIntBuilder";
	constructor(name, config) {
		super(name, "bigint", "MySqlDecimalBigInt");
		this.config.precision = config?.precision;
		this.config.scale = config?.scale;
		this.config.unsigned = config?.unsigned;
	}
	/** @internal */
	build(table) {
		return new MySqlDecimalBigInt(table, this.config);
	}
};
var MySqlDecimalBigInt = class extends MySqlColumnWithAutoIncrement {
	static [entityKind] = "MySqlDecimalBigInt";
	precision = this.config.precision;
	scale = this.config.scale;
	unsigned = this.config.unsigned;
	mapFromDriverValue = BigInt;
	mapToDriverValue = String;
	getSQLType() {
		let type = "";
		if (this.precision !== void 0 && this.scale !== void 0) type += `decimal(${this.precision},${this.scale})`;
		else if (this.precision === void 0) type += "decimal";
		else type += `decimal(${this.precision})`;
		type = type === "decimal(10,0)" || type === "decimal(10)" ? "decimal" : type;
		return this.unsigned ? `${type} unsigned` : type;
	}
};
function decimal(a, b = {}) {
	const { name, config } = getColumnNameAndConfig(a, b);
	const mode = config?.mode;
	return mode === "number" ? new MySqlDecimalNumberBuilder(name, config) : mode === "bigint" ? new MySqlDecimalBigIntBuilder(name, config) : new MySqlDecimalBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/double.js
var MySqlDoubleBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
	static [entityKind] = "MySqlDoubleBuilder";
	constructor(name, config) {
		super(name, "number", "MySqlDouble");
		this.config.precision = config?.precision;
		this.config.scale = config?.scale;
		this.config.unsigned = config?.unsigned;
	}
	/** @internal */
	build(table) {
		return new MySqlDouble(table, this.config);
	}
};
var MySqlDouble = class extends MySqlColumnWithAutoIncrement {
	static [entityKind] = "MySqlDouble";
	precision = this.config.precision;
	scale = this.config.scale;
	unsigned = this.config.unsigned;
	getSQLType() {
		let type = "";
		if (this.precision !== void 0 && this.scale !== void 0) type += `double(${this.precision},${this.scale})`;
		else if (this.precision === void 0) type += "double";
		else type += `double(${this.precision})`;
		return this.unsigned ? `${type} unsigned` : type;
	}
};
function double(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlDoubleBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/enum.js
var MySqlEnumColumnBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlEnumColumnBuilder";
	constructor(name, values) {
		super(name, "string", "MySqlEnumColumn");
		this.config.enumValues = values;
	}
	/** @internal */
	build(table) {
		return new MySqlEnumColumn(table, this.config);
	}
};
var MySqlEnumColumn = class extends MySqlColumn {
	static [entityKind] = "MySqlEnumColumn";
	enumValues = this.config.enumValues;
	getSQLType() {
		return `enum(${this.enumValues.map((value) => `'${value}'`).join(",")})`;
	}
};
var MySqlEnumObjectColumnBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlEnumObjectColumnBuilder";
	constructor(name, values) {
		super(name, "string", "MySqlEnumObjectColumn");
		this.config.enumValues = values;
	}
	/** @internal */
	build(table) {
		return new MySqlEnumObjectColumn(table, this.config);
	}
};
var MySqlEnumObjectColumn = class extends MySqlColumn {
	static [entityKind] = "MySqlEnumObjectColumn";
	enumValues = this.config.enumValues;
	getSQLType() {
		return `enum(${this.enumValues.map((value) => `'${value}'`).join(",")})`;
	}
};
function mysqlEnum(a, b) {
	if (typeof a === "string" && Array.isArray(b) || Array.isArray(a)) {
		const name = typeof a === "string" && a.length > 0 ? a : "";
		const values = (typeof a === "string" ? b : a) ?? [];
		if (values.length === 0) throw new Error(`You have an empty array for "${name}" enum values`);
		return new MySqlEnumColumnBuilder(name, values);
	}
	if (typeof a === "string" && typeof b === "object" || typeof a === "object") {
		const name = typeof a === "object" ? "" : a;
		const values = typeof a === "object" ? Object.values(a) : typeof b === "object" ? Object.values(b) : [];
		if (values.length === 0) throw new Error(`You have an empty array for "${name}" enum values`);
		return new MySqlEnumObjectColumnBuilder(name, values);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/float.js
var MySqlFloatBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
	static [entityKind] = "MySqlFloatBuilder";
	constructor(name, config) {
		super(name, "number", "MySqlFloat");
		this.config.precision = config?.precision;
		this.config.scale = config?.scale;
		this.config.unsigned = config?.unsigned;
	}
	/** @internal */
	build(table) {
		return new MySqlFloat(table, this.config);
	}
};
var MySqlFloat = class extends MySqlColumnWithAutoIncrement {
	static [entityKind] = "MySqlFloat";
	precision = this.config.precision;
	scale = this.config.scale;
	unsigned = this.config.unsigned;
	getSQLType() {
		let type = "";
		if (this.precision !== void 0 && this.scale !== void 0) type += `float(${this.precision},${this.scale})`;
		else if (this.precision === void 0) type += "float";
		else type += `float(${this.precision})`;
		return this.unsigned ? `${type} unsigned` : type;
	}
};
function float(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlFloatBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/int.js
var MySqlIntBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
	static [entityKind] = "MySqlIntBuilder";
	constructor(name, config) {
		super(name, "number", "MySqlInt");
		this.config.unsigned = config ? config.unsigned : false;
	}
	/** @internal */
	build(table) {
		return new MySqlInt(table, this.config);
	}
};
var MySqlInt = class extends MySqlColumnWithAutoIncrement {
	static [entityKind] = "MySqlInt";
	getSQLType() {
		return `int${this.config.unsigned ? " unsigned" : ""}`;
	}
	mapFromDriverValue(value) {
		if (typeof value === "string") return Number(value);
		return value;
	}
};
function int(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlIntBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/json.js
var MySqlJsonBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlJsonBuilder";
	constructor(name) {
		super(name, "json", "MySqlJson");
	}
	/** @internal */
	build(table) {
		return new MySqlJson(table, this.config);
	}
};
var MySqlJson = class extends MySqlColumn {
	static [entityKind] = "MySqlJson";
	getSQLType() {
		return "json";
	}
	mapToDriverValue(value) {
		return JSON.stringify(value);
	}
};
function json(name) {
	return new MySqlJsonBuilder(name ?? "");
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/mediumint.js
var MySqlMediumIntBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
	static [entityKind] = "MySqlMediumIntBuilder";
	constructor(name, config) {
		super(name, "number", "MySqlMediumInt");
		this.config.unsigned = config ? config.unsigned : false;
	}
	/** @internal */
	build(table) {
		return new MySqlMediumInt(table, this.config);
	}
};
var MySqlMediumInt = class extends MySqlColumnWithAutoIncrement {
	static [entityKind] = "MySqlMediumInt";
	getSQLType() {
		return `mediumint${this.config.unsigned ? " unsigned" : ""}`;
	}
	mapFromDriverValue(value) {
		if (typeof value === "string") return Number(value);
		return value;
	}
};
function mediumint(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlMediumIntBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/real.js
var MySqlRealBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
	static [entityKind] = "MySqlRealBuilder";
	constructor(name, config) {
		super(name, "number", "MySqlReal");
		this.config.precision = config?.precision;
		this.config.scale = config?.scale;
	}
	/** @internal */
	build(table) {
		return new MySqlReal(table, this.config);
	}
};
var MySqlReal = class extends MySqlColumnWithAutoIncrement {
	static [entityKind] = "MySqlReal";
	precision = this.config.precision;
	scale = this.config.scale;
	getSQLType() {
		if (this.precision !== void 0 && this.scale !== void 0) return `real(${this.precision}, ${this.scale})`;
		else if (this.precision === void 0) return "real";
		else return `real(${this.precision})`;
	}
};
function real$1(a, b = {}) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlRealBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/serial.js
var MySqlSerialBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
	static [entityKind] = "MySqlSerialBuilder";
	constructor(name) {
		super(name, "number", "MySqlSerial");
		this.config.hasDefault = true;
		this.config.autoIncrement = true;
	}
	/** @internal */
	build(table) {
		return new MySqlSerial(table, this.config);
	}
};
var MySqlSerial = class extends MySqlColumnWithAutoIncrement {
	static [entityKind] = "MySqlSerial";
	getSQLType() {
		return "serial";
	}
	mapFromDriverValue(value) {
		if (typeof value === "string") return Number(value);
		return value;
	}
};
function serial(name) {
	return new MySqlSerialBuilder(name ?? "");
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/smallint.js
var MySqlSmallIntBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
	static [entityKind] = "MySqlSmallIntBuilder";
	constructor(name, config) {
		super(name, "number", "MySqlSmallInt");
		this.config.unsigned = config ? config.unsigned : false;
	}
	/** @internal */
	build(table) {
		return new MySqlSmallInt(table, this.config);
	}
};
var MySqlSmallInt = class extends MySqlColumnWithAutoIncrement {
	static [entityKind] = "MySqlSmallInt";
	getSQLType() {
		return `smallint${this.config.unsigned ? " unsigned" : ""}`;
	}
	mapFromDriverValue(value) {
		if (typeof value === "string") return Number(value);
		return value;
	}
};
function smallint(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlSmallIntBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/text.js
var MySqlTextBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlTextBuilder";
	constructor(name, textType, config) {
		super(name, "string", "MySqlText");
		this.config.textType = textType;
		this.config.enumValues = config.enum;
	}
	/** @internal */
	build(table) {
		return new MySqlText(table, this.config);
	}
};
var MySqlText = class extends MySqlColumn {
	static [entityKind] = "MySqlText";
	textType = this.config.textType;
	enumValues = this.config.enumValues;
	getSQLType() {
		return this.textType;
	}
};
function text$1(a, b = {}) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlTextBuilder(name, "text", config);
}
function tinytext(a, b = {}) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlTextBuilder(name, "tinytext", config);
}
function mediumtext(a, b = {}) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlTextBuilder(name, "mediumtext", config);
}
function longtext(a, b = {}) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlTextBuilder(name, "longtext", config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/time.js
var MySqlTimeBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlTimeBuilder";
	constructor(name, config) {
		super(name, "string", "MySqlTime");
		this.config.fsp = config?.fsp;
	}
	/** @internal */
	build(table) {
		return new MySqlTime(table, this.config);
	}
};
var MySqlTime = class extends MySqlColumn {
	static [entityKind] = "MySqlTime";
	fsp = this.config.fsp;
	getSQLType() {
		return `time${this.fsp === void 0 ? "" : `(${this.fsp})`}`;
	}
};
function time(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlTimeBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/date.common.js
var MySqlDateColumnBaseBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlDateColumnBuilder";
	defaultNow() {
		return this.default(sql`(now())`);
	}
	onUpdateNow() {
		this.config.hasOnUpdateNow = true;
		this.config.hasDefault = true;
		return this;
	}
};
var MySqlDateBaseColumn = class extends MySqlColumn {
	static [entityKind] = "MySqlDateColumn";
	hasOnUpdateNow = this.config.hasOnUpdateNow;
};
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/timestamp.js
var MySqlTimestampBuilder = class extends MySqlDateColumnBaseBuilder {
	static [entityKind] = "MySqlTimestampBuilder";
	constructor(name, config) {
		super(name, "date", "MySqlTimestamp");
		this.config.fsp = config?.fsp;
	}
	/** @internal */
	build(table) {
		return new MySqlTimestamp(table, this.config);
	}
};
var MySqlTimestamp = class extends MySqlDateBaseColumn {
	static [entityKind] = "MySqlTimestamp";
	fsp = this.config.fsp;
	getSQLType() {
		return `timestamp${this.fsp === void 0 ? "" : `(${this.fsp})`}`;
	}
	mapFromDriverValue(value) {
		return /* @__PURE__ */ new Date(value + "+0000");
	}
	mapToDriverValue(value) {
		return value.toISOString().slice(0, -1).replace("T", " ");
	}
};
var MySqlTimestampStringBuilder = class extends MySqlDateColumnBaseBuilder {
	static [entityKind] = "MySqlTimestampStringBuilder";
	constructor(name, config) {
		super(name, "string", "MySqlTimestampString");
		this.config.fsp = config?.fsp;
	}
	/** @internal */
	build(table) {
		return new MySqlTimestampString(table, this.config);
	}
};
var MySqlTimestampString = class extends MySqlDateBaseColumn {
	static [entityKind] = "MySqlTimestampString";
	fsp = this.config.fsp;
	getSQLType() {
		return `timestamp${this.fsp === void 0 ? "" : `(${this.fsp})`}`;
	}
};
function timestamp(a, b = {}) {
	const { name, config } = getColumnNameAndConfig(a, b);
	if (config?.mode === "string") return new MySqlTimestampStringBuilder(name, config);
	return new MySqlTimestampBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/tinyint.js
var MySqlTinyIntBuilder = class extends MySqlColumnBuilderWithAutoIncrement {
	static [entityKind] = "MySqlTinyIntBuilder";
	constructor(name, config) {
		super(name, "number", "MySqlTinyInt");
		this.config.unsigned = config ? config.unsigned : false;
	}
	/** @internal */
	build(table) {
		return new MySqlTinyInt(table, this.config);
	}
};
var MySqlTinyInt = class extends MySqlColumnWithAutoIncrement {
	static [entityKind] = "MySqlTinyInt";
	getSQLType() {
		return `tinyint${this.config.unsigned ? " unsigned" : ""}`;
	}
	mapFromDriverValue(value) {
		if (typeof value === "string") return Number(value);
		return value;
	}
};
function tinyint(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlTinyIntBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/varbinary.js
var MySqlVarBinaryBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlVarBinaryBuilder";
	/** @internal */
	constructor(name, config) {
		super(name, "string", "MySqlVarBinary");
		this.config.length = config?.length;
	}
	/** @internal */
	build(table) {
		return new MySqlVarBinary(table, this.config);
	}
};
var MySqlVarBinary = class extends MySqlColumn {
	static [entityKind] = "MySqlVarBinary";
	length = this.config.length;
	mapFromDriverValue(value) {
		if (typeof value === "string") return value;
		if (Buffer.isBuffer(value)) return value.toString();
		const str = [];
		for (const v of value) str.push(v === 49 ? "1" : "0");
		return str.join("");
	}
	getSQLType() {
		return this.length === void 0 ? `varbinary` : `varbinary(${this.length})`;
	}
};
function varbinary(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlVarBinaryBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/varchar.js
var MySqlVarCharBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlVarCharBuilder";
	/** @internal */
	constructor(name, config) {
		super(name, "string", "MySqlVarChar");
		this.config.length = config.length;
		this.config.enum = config.enum;
	}
	/** @internal */
	build(table) {
		return new MySqlVarChar(table, this.config);
	}
};
var MySqlVarChar = class extends MySqlColumn {
	static [entityKind] = "MySqlVarChar";
	length = this.config.length;
	enumValues = this.config.enum;
	getSQLType() {
		return this.length === void 0 ? `varchar` : `varchar(${this.length})`;
	}
};
function varchar(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	return new MySqlVarCharBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/year.js
var MySqlYearBuilder = class extends MySqlColumnBuilder {
	static [entityKind] = "MySqlYearBuilder";
	constructor(name) {
		super(name, "number", "MySqlYear");
	}
	/** @internal */
	build(table) {
		return new MySqlYear(table, this.config);
	}
};
var MySqlYear = class extends MySqlColumn {
	static [entityKind] = "MySqlYear";
	getSQLType() {
		return `year`;
	}
};
function year(name) {
	return new MySqlYearBuilder(name ?? "");
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/indexes.js
var IndexBuilderOn$1 = class {
	constructor(name, unique) {
		this.name = name;
		this.unique = unique;
	}
	static [entityKind] = "MySqlIndexBuilderOn";
	on(...columns) {
		return new IndexBuilder$1(this.name, columns, this.unique);
	}
};
var IndexBuilder$1 = class {
	static [entityKind] = "MySqlIndexBuilder";
	/** @internal */
	config;
	constructor(name, columns, unique) {
		this.config = {
			name,
			columns,
			unique
		};
	}
	using(using) {
		this.config.using = using;
		return this;
	}
	algorithm(algorithm) {
		this.config.algorithm = algorithm;
		return this;
	}
	lock(lock) {
		this.config.lock = lock;
		return this;
	}
	/** @internal */
	build(table) {
		return new Index$1(this.config, table);
	}
};
var Index$1 = class {
	static [entityKind] = "MySqlIndex";
	config;
	constructor(config, table) {
		this.config = {
			...config,
			table
		};
	}
};
function index$1(name) {
	return new IndexBuilderOn$1(name, false);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/columns/all.js
function getMySqlColumnBuilders() {
	return {
		bigint,
		binary,
		boolean,
		char,
		customType: customType$1,
		date,
		datetime,
		decimal,
		double,
		mysqlEnum,
		float,
		int,
		json,
		mediumint,
		real: real$1,
		serial,
		smallint,
		text: text$1,
		time,
		timestamp,
		tinyint,
		varbinary,
		varchar,
		year,
		longtext,
		mediumtext,
		tinytext
	};
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/table.js
const InlineForeignKeys$1 = Symbol.for("drizzle:MySqlInlineForeignKeys");
var MySqlTable = class extends Table {
	static [entityKind] = "MySqlTable";
	/** @internal */
	static Symbol = Object.assign({}, Table.Symbol, { InlineForeignKeys: InlineForeignKeys$1 });
	/** @internal */
	[Table.Symbol.Columns];
	/** @internal */
	[InlineForeignKeys$1] = [];
	/** @internal */
	[Table.Symbol.ExtraConfigBuilder] = void 0;
};
function mysqlTableWithSchema(name, columns, extraConfig, schema, baseName = name) {
	const rawTable = new MySqlTable(name, schema, baseName);
	const parsedColumns = typeof columns === "function" ? columns(getMySqlColumnBuilders()) : columns;
	const builtColumns = Object.fromEntries(Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
		const colBuilder = colBuilderBase;
		colBuilder.setName(name2);
		const column = colBuilder.build(rawTable);
		rawTable[InlineForeignKeys$1].push(...colBuilder.buildForeignKeys(column, rawTable));
		return [name2, column];
	}));
	const table = Object.assign(rawTable, builtColumns);
	table[Table.Symbol.Columns] = builtColumns;
	table[Table.Symbol.ExtraConfigColumns] = builtColumns;
	if (extraConfig) table[MySqlTable.Symbol.ExtraConfigBuilder] = extraConfig;
	return table;
}
const mysqlTable = (name, columns, extraConfig) => {
	return mysqlTableWithSchema(name, columns, extraConfig, void 0, name);
};
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/mysql-core/primary-keys.js
function primaryKey$1(...config) {
	if (config[0].columns) return new PrimaryKeyBuilder$1(config[0].columns, config[0].name);
	return new PrimaryKeyBuilder$1(config);
}
var PrimaryKeyBuilder$1 = class {
	static [entityKind] = "MySqlPrimaryKeyBuilder";
	/** @internal */
	columns;
	/** @internal */
	name;
	constructor(columns, name) {
		this.columns = columns;
		this.name = name;
	}
	/** @internal */
	build(table) {
		return new PrimaryKey$1(table, this.columns, this.name);
	}
};
var PrimaryKey$1 = class {
	constructor(table, columns, name) {
		this.table = table;
		this.columns = columns;
		this.name = name;
	}
	static [entityKind] = "MySqlPrimaryKey";
	columns;
	name;
	getName() {
		return this.name ?? `${this.table[MySqlTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
	}
};
//#endregion
//#region ../../packages/db-schema/src/schema-mysql.ts
var schema_mysql_exports = /* @__PURE__ */ __exportAll({
	projects: () => projects$1,
	rawDeltas: () => rawDeltas$1,
	rawEvents: () => rawEvents$1,
	sessions: () => sessions$1,
	settings: () => settings$1
});
const sessions$1 = mysqlTable("sessions", {
	id: varchar("id", { length: 64 }).primaryKey(),
	parentId: varchar("parent_id", { length: 36 }),
	channelId: varchar("channel_id", { length: 36 }),
	provider: varchar("provider", { length: 20 }).notNull(),
	command: varchar("command", { length: 255 }).notNull(),
	args: text$1("args").notNull(),
	cwd: text$1("cwd"),
	projectRoot: text$1("project_root").notNull(),
	mode: varchar("mode", { length: 20 }).notNull().default("print"),
	role: varchar("role", { length: 20 }).notNull().default("chat"),
	title: varchar("title", { length: 200 }),
	status: varchar("status", { length: 20 }).notNull().default("active"),
	createdAt: varchar("created_at", { length: 30 }).notNull()
}, (table) => [index$1("idx_sessions_channel_id").on(table.channelId)]);
const rawEvents$1 = mysqlTable("raw_events", {
	id: varchar("id", { length: 36 }).primaryKey(),
	sessionId: varchar("session_id", { length: 36 }).notNull(),
	dir: varchar("dir", { length: 10 }).notNull(),
	raw: mediumtext("raw").notNull(),
	createdAt: varchar("created_at", { length: 30 }).notNull()
}, (table) => [index$1("idx_raw_events_session_created_id").on(table.sessionId, table.createdAt, table.id)]);
const rawDeltas$1 = mysqlTable("raw_deltas", {
	id: varchar("id", { length: 36 }).primaryKey(),
	parentId: varchar("parent_id", { length: 36 }).notNull(),
	sessionId: varchar("session_id", { length: 36 }).notNull(),
	dir: varchar("dir", { length: 10 }).notNull(),
	raw: mediumtext("raw").notNull(),
	createdAt: varchar("created_at", { length: 30 }).notNull()
}, (table) => [index$1("idx_raw_deltas_session_created_id").on(table.sessionId, table.createdAt, table.id), index$1("idx_raw_deltas_parent").on(table.parentId)]);
const settings$1 = mysqlTable("settings", {
	provider: varchar("provider", { length: 20 }).notNull(),
	key: varchar("key", { length: 100 }).notNull(),
	value: text$1("value").notNull()
}, (table) => [primaryKey$1({ columns: [table.provider, table.key] })]);
const projects$1 = mysqlTable("projects", {
	id: varchar("id", { length: 36 }).primaryKey(),
	path: varchar("path", { length: 768 }).notNull().unique(),
	name: varchar("name", { length: 255 }).notNull(),
	pinned: boolean("pinned").notNull().default(false),
	color: varchar("color", { length: 16 }),
	lastOpenedAt: varchar("last_opened_at", { length: 30 }).notNull(),
	createdAt: varchar("created_at", { length: 30 }).notNull()
}, (table) => [index$1("idx_projects_pinned_last_opened").on(table.pinned, table.lastOpenedAt)]);
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sqlite-core/foreign-keys.js
var ForeignKeyBuilder = class {
	static [entityKind] = "SQLiteForeignKeyBuilder";
	/** @internal */
	reference;
	/** @internal */
	_onUpdate;
	/** @internal */
	_onDelete;
	constructor(config, actions) {
		this.reference = () => {
			const { name, columns, foreignColumns } = config();
			return {
				name,
				columns,
				foreignTable: foreignColumns[0].table,
				foreignColumns
			};
		};
		if (actions) {
			this._onUpdate = actions.onUpdate;
			this._onDelete = actions.onDelete;
		}
	}
	onUpdate(action) {
		this._onUpdate = action;
		return this;
	}
	onDelete(action) {
		this._onDelete = action;
		return this;
	}
	/** @internal */
	build(table) {
		return new ForeignKey(table, this);
	}
};
var ForeignKey = class {
	constructor(table, builder) {
		this.table = table;
		this.reference = builder.reference;
		this.onUpdate = builder._onUpdate;
		this.onDelete = builder._onDelete;
	}
	static [entityKind] = "SQLiteForeignKey";
	reference;
	onUpdate;
	onDelete;
	getName() {
		const { name, columns, foreignColumns } = this.reference();
		const columnNames = columns.map((column) => column.name);
		const foreignColumnNames = foreignColumns.map((column) => column.name);
		const chunks = [
			this.table[TableName],
			...columnNames,
			foreignColumns[0].table[TableName],
			...foreignColumnNames
		];
		return name ?? `${chunks.join("_")}_fk`;
	}
};
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sqlite-core/unique-constraint.js
function uniqueKeyName(table, columns) {
	return `${table[TableName]}_${columns.join("_")}_unique`;
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sqlite-core/columns/common.js
var SQLiteColumnBuilder = class extends ColumnBuilder {
	static [entityKind] = "SQLiteColumnBuilder";
	foreignKeyConfigs = [];
	references(ref, actions = {}) {
		this.foreignKeyConfigs.push({
			ref,
			actions
		});
		return this;
	}
	unique(name) {
		this.config.isUnique = true;
		this.config.uniqueName = name;
		return this;
	}
	generatedAlwaysAs(as, config) {
		this.config.generated = {
			as,
			type: "always",
			mode: config?.mode ?? "virtual"
		};
		return this;
	}
	/** @internal */
	buildForeignKeys(column, table) {
		return this.foreignKeyConfigs.map(({ ref, actions }) => {
			return ((ref2, actions2) => {
				const builder = new ForeignKeyBuilder(() => {
					const foreignColumn = ref2();
					return {
						columns: [column],
						foreignColumns: [foreignColumn]
					};
				});
				if (actions2.onUpdate) builder.onUpdate(actions2.onUpdate);
				if (actions2.onDelete) builder.onDelete(actions2.onDelete);
				return builder.build(table);
			})(ref, actions);
		});
	}
};
var SQLiteColumn = class extends Column {
	constructor(table, config) {
		if (!config.uniqueName) config.uniqueName = uniqueKeyName(table, [config.name]);
		super(table, config);
		this.table = table;
	}
	static [entityKind] = "SQLiteColumn";
};
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sqlite-core/columns/blob.js
var SQLiteBigIntBuilder = class extends SQLiteColumnBuilder {
	static [entityKind] = "SQLiteBigIntBuilder";
	constructor(name) {
		super(name, "bigint", "SQLiteBigInt");
	}
	/** @internal */
	build(table) {
		return new SQLiteBigInt(table, this.config);
	}
};
var SQLiteBigInt = class extends SQLiteColumn {
	static [entityKind] = "SQLiteBigInt";
	getSQLType() {
		return "blob";
	}
	mapFromDriverValue(value) {
		if (typeof Buffer !== "undefined" && Buffer.from) {
			const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
			return BigInt(buf.toString("utf8"));
		}
		return BigInt(textDecoder.decode(value));
	}
	mapToDriverValue(value) {
		return Buffer.from(value.toString());
	}
};
var SQLiteBlobJsonBuilder = class extends SQLiteColumnBuilder {
	static [entityKind] = "SQLiteBlobJsonBuilder";
	constructor(name) {
		super(name, "json", "SQLiteBlobJson");
	}
	/** @internal */
	build(table) {
		return new SQLiteBlobJson(table, this.config);
	}
};
var SQLiteBlobJson = class extends SQLiteColumn {
	static [entityKind] = "SQLiteBlobJson";
	getSQLType() {
		return "blob";
	}
	mapFromDriverValue(value) {
		if (typeof Buffer !== "undefined" && Buffer.from) {
			const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
			return JSON.parse(buf.toString("utf8"));
		}
		return JSON.parse(textDecoder.decode(value));
	}
	mapToDriverValue(value) {
		return Buffer.from(JSON.stringify(value));
	}
};
var SQLiteBlobBufferBuilder = class extends SQLiteColumnBuilder {
	static [entityKind] = "SQLiteBlobBufferBuilder";
	constructor(name) {
		super(name, "buffer", "SQLiteBlobBuffer");
	}
	/** @internal */
	build(table) {
		return new SQLiteBlobBuffer(table, this.config);
	}
};
var SQLiteBlobBuffer = class extends SQLiteColumn {
	static [entityKind] = "SQLiteBlobBuffer";
	mapFromDriverValue(value) {
		if (Buffer.isBuffer(value)) return value;
		return Buffer.from(value);
	}
	getSQLType() {
		return "blob";
	}
};
function blob(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	if (config?.mode === "json") return new SQLiteBlobJsonBuilder(name);
	if (config?.mode === "bigint") return new SQLiteBigIntBuilder(name);
	return new SQLiteBlobBufferBuilder(name);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sqlite-core/columns/custom.js
var SQLiteCustomColumnBuilder = class extends SQLiteColumnBuilder {
	static [entityKind] = "SQLiteCustomColumnBuilder";
	constructor(name, fieldConfig, customTypeParams) {
		super(name, "custom", "SQLiteCustomColumn");
		this.config.fieldConfig = fieldConfig;
		this.config.customTypeParams = customTypeParams;
	}
	/** @internal */
	build(table) {
		return new SQLiteCustomColumn(table, this.config);
	}
};
var SQLiteCustomColumn = class extends SQLiteColumn {
	static [entityKind] = "SQLiteCustomColumn";
	sqlName;
	mapTo;
	mapFrom;
	constructor(table, config) {
		super(table, config);
		this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
		this.mapTo = config.customTypeParams.toDriver;
		this.mapFrom = config.customTypeParams.fromDriver;
	}
	getSQLType() {
		return this.sqlName;
	}
	mapFromDriverValue(value) {
		return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
	}
	mapToDriverValue(value) {
		return typeof this.mapTo === "function" ? this.mapTo(value) : value;
	}
};
function customType(customTypeParams) {
	return (a, b) => {
		const { name, config } = getColumnNameAndConfig(a, b);
		return new SQLiteCustomColumnBuilder(name, config, customTypeParams);
	};
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sqlite-core/columns/integer.js
var SQLiteBaseIntegerBuilder = class extends SQLiteColumnBuilder {
	static [entityKind] = "SQLiteBaseIntegerBuilder";
	constructor(name, dataType, columnType) {
		super(name, dataType, columnType);
		this.config.autoIncrement = false;
	}
	primaryKey(config) {
		if (config?.autoIncrement) this.config.autoIncrement = true;
		this.config.hasDefault = true;
		return super.primaryKey();
	}
};
var SQLiteBaseInteger = class extends SQLiteColumn {
	static [entityKind] = "SQLiteBaseInteger";
	autoIncrement = this.config.autoIncrement;
	getSQLType() {
		return "integer";
	}
};
var SQLiteIntegerBuilder = class extends SQLiteBaseIntegerBuilder {
	static [entityKind] = "SQLiteIntegerBuilder";
	constructor(name) {
		super(name, "number", "SQLiteInteger");
	}
	build(table) {
		return new SQLiteInteger(table, this.config);
	}
};
var SQLiteInteger = class extends SQLiteBaseInteger {
	static [entityKind] = "SQLiteInteger";
};
var SQLiteTimestampBuilder = class extends SQLiteBaseIntegerBuilder {
	static [entityKind] = "SQLiteTimestampBuilder";
	constructor(name, mode) {
		super(name, "date", "SQLiteTimestamp");
		this.config.mode = mode;
	}
	/**
	* @deprecated Use `default()` with your own expression instead.
	*
	* Adds `DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))` to the column, which is the current epoch timestamp in milliseconds.
	*/
	defaultNow() {
		return this.default(sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
	}
	build(table) {
		return new SQLiteTimestamp(table, this.config);
	}
};
var SQLiteTimestamp = class extends SQLiteBaseInteger {
	static [entityKind] = "SQLiteTimestamp";
	mode = this.config.mode;
	mapFromDriverValue(value) {
		if (this.config.mode === "timestamp") return /* @__PURE__ */ new Date(value * 1e3);
		return new Date(value);
	}
	mapToDriverValue(value) {
		const unix = value.getTime();
		if (this.config.mode === "timestamp") return Math.floor(unix / 1e3);
		return unix;
	}
};
var SQLiteBooleanBuilder = class extends SQLiteBaseIntegerBuilder {
	static [entityKind] = "SQLiteBooleanBuilder";
	constructor(name, mode) {
		super(name, "boolean", "SQLiteBoolean");
		this.config.mode = mode;
	}
	build(table) {
		return new SQLiteBoolean(table, this.config);
	}
};
var SQLiteBoolean = class extends SQLiteBaseInteger {
	static [entityKind] = "SQLiteBoolean";
	mode = this.config.mode;
	mapFromDriverValue(value) {
		return Number(value) === 1;
	}
	mapToDriverValue(value) {
		return value ? 1 : 0;
	}
};
function integer(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	if (config?.mode === "timestamp" || config?.mode === "timestamp_ms") return new SQLiteTimestampBuilder(name, config.mode);
	if (config?.mode === "boolean") return new SQLiteBooleanBuilder(name, config.mode);
	return new SQLiteIntegerBuilder(name);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sqlite-core/columns/numeric.js
var SQLiteNumericBuilder = class extends SQLiteColumnBuilder {
	static [entityKind] = "SQLiteNumericBuilder";
	constructor(name) {
		super(name, "string", "SQLiteNumeric");
	}
	/** @internal */
	build(table) {
		return new SQLiteNumeric(table, this.config);
	}
};
var SQLiteNumeric = class extends SQLiteColumn {
	static [entityKind] = "SQLiteNumeric";
	mapFromDriverValue(value) {
		if (typeof value === "string") return value;
		return String(value);
	}
	getSQLType() {
		return "numeric";
	}
};
var SQLiteNumericNumberBuilder = class extends SQLiteColumnBuilder {
	static [entityKind] = "SQLiteNumericNumberBuilder";
	constructor(name) {
		super(name, "number", "SQLiteNumericNumber");
	}
	/** @internal */
	build(table) {
		return new SQLiteNumericNumber(table, this.config);
	}
};
var SQLiteNumericNumber = class extends SQLiteColumn {
	static [entityKind] = "SQLiteNumericNumber";
	mapFromDriverValue(value) {
		if (typeof value === "number") return value;
		return Number(value);
	}
	mapToDriverValue = String;
	getSQLType() {
		return "numeric";
	}
};
var SQLiteNumericBigIntBuilder = class extends SQLiteColumnBuilder {
	static [entityKind] = "SQLiteNumericBigIntBuilder";
	constructor(name) {
		super(name, "bigint", "SQLiteNumericBigInt");
	}
	/** @internal */
	build(table) {
		return new SQLiteNumericBigInt(table, this.config);
	}
};
var SQLiteNumericBigInt = class extends SQLiteColumn {
	static [entityKind] = "SQLiteNumericBigInt";
	mapFromDriverValue = BigInt;
	mapToDriverValue = String;
	getSQLType() {
		return "numeric";
	}
};
function numeric(a, b) {
	const { name, config } = getColumnNameAndConfig(a, b);
	const mode = config?.mode;
	return mode === "number" ? new SQLiteNumericNumberBuilder(name) : mode === "bigint" ? new SQLiteNumericBigIntBuilder(name) : new SQLiteNumericBuilder(name);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sqlite-core/columns/real.js
var SQLiteRealBuilder = class extends SQLiteColumnBuilder {
	static [entityKind] = "SQLiteRealBuilder";
	constructor(name) {
		super(name, "number", "SQLiteReal");
	}
	/** @internal */
	build(table) {
		return new SQLiteReal(table, this.config);
	}
};
var SQLiteReal = class extends SQLiteColumn {
	static [entityKind] = "SQLiteReal";
	getSQLType() {
		return "real";
	}
};
function real(name) {
	return new SQLiteRealBuilder(name ?? "");
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sqlite-core/columns/text.js
var SQLiteTextBuilder = class extends SQLiteColumnBuilder {
	static [entityKind] = "SQLiteTextBuilder";
	constructor(name, config) {
		super(name, "string", "SQLiteText");
		this.config.enumValues = config.enum;
		this.config.length = config.length;
	}
	/** @internal */
	build(table) {
		return new SQLiteText(table, this.config);
	}
};
var SQLiteText = class extends SQLiteColumn {
	static [entityKind] = "SQLiteText";
	enumValues = this.config.enumValues;
	length = this.config.length;
	constructor(table, config) {
		super(table, config);
	}
	getSQLType() {
		return `text${this.config.length ? `(${this.config.length})` : ""}`;
	}
};
var SQLiteTextJsonBuilder = class extends SQLiteColumnBuilder {
	static [entityKind] = "SQLiteTextJsonBuilder";
	constructor(name) {
		super(name, "json", "SQLiteTextJson");
	}
	/** @internal */
	build(table) {
		return new SQLiteTextJson(table, this.config);
	}
};
var SQLiteTextJson = class extends SQLiteColumn {
	static [entityKind] = "SQLiteTextJson";
	getSQLType() {
		return "text";
	}
	mapFromDriverValue(value) {
		return JSON.parse(value);
	}
	mapToDriverValue(value) {
		return JSON.stringify(value);
	}
};
function text(a, b = {}) {
	const { name, config } = getColumnNameAndConfig(a, b);
	if (config.mode === "json") return new SQLiteTextJsonBuilder(name);
	return new SQLiteTextBuilder(name, config);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sqlite-core/columns/all.js
function getSQLiteColumnBuilders() {
	return {
		blob,
		customType,
		integer,
		numeric,
		real,
		text
	};
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sqlite-core/table.js
const InlineForeignKeys = Symbol.for("drizzle:SQLiteInlineForeignKeys");
var SQLiteTable = class extends Table {
	static [entityKind] = "SQLiteTable";
	/** @internal */
	static Symbol = Object.assign({}, Table.Symbol, { InlineForeignKeys });
	/** @internal */
	[Table.Symbol.Columns];
	/** @internal */
	[InlineForeignKeys] = [];
	/** @internal */
	[Table.Symbol.ExtraConfigBuilder] = void 0;
};
function sqliteTableBase(name, columns, extraConfig, schema, baseName = name) {
	const rawTable = new SQLiteTable(name, schema, baseName);
	const parsedColumns = typeof columns === "function" ? columns(getSQLiteColumnBuilders()) : columns;
	const builtColumns = Object.fromEntries(Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
		const colBuilder = colBuilderBase;
		colBuilder.setName(name2);
		const column = colBuilder.build(rawTable);
		rawTable[InlineForeignKeys].push(...colBuilder.buildForeignKeys(column, rawTable));
		return [name2, column];
	}));
	const table = Object.assign(rawTable, builtColumns);
	table[Table.Symbol.Columns] = builtColumns;
	table[Table.Symbol.ExtraConfigColumns] = builtColumns;
	if (extraConfig) table[SQLiteTable.Symbol.ExtraConfigBuilder] = extraConfig;
	return table;
}
const sqliteTable = (name, columns, extraConfig) => {
	return sqliteTableBase(name, columns, extraConfig);
};
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sqlite-core/indexes.js
var IndexBuilderOn = class {
	constructor(name, unique) {
		this.name = name;
		this.unique = unique;
	}
	static [entityKind] = "SQLiteIndexBuilderOn";
	on(...columns) {
		return new IndexBuilder(this.name, columns, this.unique);
	}
};
var IndexBuilder = class {
	static [entityKind] = "SQLiteIndexBuilder";
	/** @internal */
	config;
	constructor(name, columns, unique) {
		this.config = {
			name,
			columns,
			unique,
			where: void 0
		};
	}
	/**
	* Condition for partial index.
	*/
	where(condition) {
		this.config.where = condition;
		return this;
	}
	/** @internal */
	build(table) {
		return new Index(this.config, table);
	}
};
var Index = class {
	static [entityKind] = "SQLiteIndex";
	config;
	constructor(config, table) {
		this.config = {
			...config,
			table
		};
	}
};
function index(name) {
	return new IndexBuilderOn(name, false);
}
//#endregion
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/sqlite-core/primary-keys.js
function primaryKey(...config) {
	if (config[0].columns) return new PrimaryKeyBuilder(config[0].columns, config[0].name);
	return new PrimaryKeyBuilder(config);
}
var PrimaryKeyBuilder = class {
	static [entityKind] = "SQLitePrimaryKeyBuilder";
	/** @internal */
	columns;
	/** @internal */
	name;
	constructor(columns, name) {
		this.columns = columns;
		this.name = name;
	}
	/** @internal */
	build(table) {
		return new PrimaryKey(table, this.columns, this.name);
	}
};
var PrimaryKey = class {
	constructor(table, columns, name) {
		this.table = table;
		this.columns = columns;
		this.name = name;
	}
	static [entityKind] = "SQLitePrimaryKey";
	columns;
	name;
	getName() {
		return this.name ?? `${this.table[SQLiteTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
	}
};
//#endregion
//#region ../../packages/db-schema/src/schema-sqlite.ts
var schema_sqlite_exports = /* @__PURE__ */ __exportAll({
	projects: () => projects,
	rawDeltas: () => rawDeltas,
	rawEvents: () => rawEvents,
	sessions: () => sessions,
	settings: () => settings
});
const sessions = sqliteTable("sessions", {
	id: text("id").primaryKey(),
	parentId: text("parent_id"),
	channelId: text("channel_id"),
	provider: text("provider").notNull(),
	command: text("command").notNull(),
	args: text("args").notNull(),
	cwd: text("cwd"),
	projectRoot: text("project_root").notNull(),
	mode: text("mode").notNull().default("print"),
	role: text("role").notNull().default("chat"),
	title: text("title"),
	status: text("status").notNull().default("active"),
	createdAt: text("created_at").notNull()
}, (table) => [index("idx_sessions_channel_id").on(table.channelId)]);
const rawEvents = sqliteTable("raw_events", {
	id: text("id").primaryKey(),
	sessionId: text("session_id").notNull(),
	dir: text("dir").notNull(),
	raw: text("raw").notNull(),
	createdAt: text("created_at").notNull()
}, (table) => [index("idx_raw_events_session_created_id").on(table.sessionId, table.createdAt, table.id)]);
const rawDeltas = sqliteTable("raw_deltas", {
	id: text("id").primaryKey(),
	parentId: text("parent_id").notNull(),
	sessionId: text("session_id").notNull(),
	dir: text("dir").notNull(),
	raw: text("raw").notNull(),
	createdAt: text("created_at").notNull()
}, (table) => [index("idx_raw_deltas_session_created_id").on(table.sessionId, table.createdAt, table.id), index("idx_raw_deltas_parent").on(table.parentId)]);
const settings = sqliteTable("settings", {
	provider: text("provider").notNull(),
	key: text("key").notNull(),
	value: text("value").notNull()
}, (table) => [primaryKey({ columns: [table.provider, table.key] })]);
const projects = sqliteTable("projects", {
	id: text("id").primaryKey(),
	path: text("path").notNull().unique(),
	name: text("name").notNull(),
	pinned: integer("pinned", { mode: "boolean" }).notNull().default(false),
	color: text("color"),
	lastOpenedAt: text("last_opened_at").notNull(),
	createdAt: text("created_at").notNull()
}, (table) => [index("idx_projects_pinned_last_opened").on(table.pinned, table.lastOpenedAt)]);
//#endregion
//#region ../../packages/db-schema/src/index.ts
const __dirname = dirname(fileURLToPath(import.meta.url));
const sqliteMigrationsFolder = resolve(__dirname, "../drizzle/sqlite");
const mysqlMigrationsFolder = resolve(__dirname, "../drizzle/mysql");
//#endregion
export { ViewBaseConfig as A, isDriverValueEncoder as C, Table as D, Columns as E, is as F, WithSubquery as M, Column as N, getTableName as O, entityKind as P, fillPlaceholders as S, sql as T, Param as _, SQLiteColumn as a, StringChunk as b, MySqlColumn as c, getTableLikeName as d, haveSameKeys as f, orderSelectedFields as g, mapUpdateSet as h, SQLiteTable as i, Subquery as j, getTableUniqueName as k, applyMixins as l, mapResultRow as m, sqliteMigrationsFolder as n, schema_mysql_exports as o, isConfig as p, schema_sqlite_exports as r, MySqlTable as s, mysqlMigrationsFolder as t, getTableColumns as u, Placeholder as v, isSQLWrapper as w, View as x, SQL as y };
