import * as path from 'node:path';
import { Pool } from 'pg';
import { promises as fs } from 'node:fs';
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
  sql,
} from 'kysely';

export const migrateToLatest = async (schema: string): Promise<void> => {
  const database = new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: +process.env.DB_PORT,
      }),
    }),
  });

  await sql`CREATE SCHEMA IF NOT EXISTS ${sql.raw(schema)}`.execute(database);
  await sql`SET search_path TO ${sql.raw(schema)}`.execute(database);

  const migrator = new Migrator({
    db: database,
    migrationTableSchema: schema,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, '../../../database/migrations'),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  if (results)
    for (const it of results) {
      if (it.status === 'Success') {
        console.log(
          `migration "${it.migrationName}" was executed successfully`,
        );
      } else if (it.status === 'Error') {
        console.error(`failed to execute migration "${it.migrationName}"`);
      }
    }

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    throw new Error(JSON.stringify(error));
  }

  await database.destroy();
};

export const deleteSchema = async (schema: string): Promise<void> => {
  const database = new Kysely<any>({
    dialect: new PostgresDialect({
      pool: new Pool({
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: +process.env.DB_PORT,
      }),
    }),
  });

  // Supprimer le schéma s'il existe, y compris tous ses objets
  await sql`DROP SCHEMA IF EXISTS ${sql.raw(schema)} CASCADE`.execute(database);

  await database.destroy();
};
