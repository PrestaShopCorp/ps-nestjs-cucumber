import type { Kysely } from 'kysely';

export async function up(database: Kysely<any>): Promise<void> {
  await database.schema
    .createTable('basket')
    .addColumn('id', 'varchar(50)', (col) => col.primaryKey())
    .addColumn('items', 'jsonb')
    .addColumn('freeShipping', 'boolean')
    .execute();
}

export async function down(database: Kysely<any>): Promise<void> {
  await database.schema.dropTable('basket').ifExists().cascade().execute();
}
