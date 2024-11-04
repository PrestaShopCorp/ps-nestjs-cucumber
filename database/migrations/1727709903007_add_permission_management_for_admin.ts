import type { Kysely } from 'kysely';

export async function up(database: Kysely<any>): Promise<void> {
  await database.schema
    .createTable('permission')
    .addColumn('id', 'varchar(50)', (col) => col.primaryKey())
    .execute();
}

export async function down(database: Kysely<any>): Promise<void> {
  await database.schema.dropTable('permission').ifExists().cascade().execute();
}
