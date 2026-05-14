import { t as readMigrationFiles } from "./migrator-xVUjvinK.js";
//#region ../../node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.10.0_mysql2@3.22.3_@types+node@25.7.0_/node_modules/drizzle-orm/better-sqlite3/migrator.js
function migrate(db, config) {
	const migrations = readMigrationFiles(config);
	db.dialect.migrate(migrations, db.session, config);
}
//#endregion
export { migrate as t };
