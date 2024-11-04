import { Injectable } from '@nestjs/common';
import {
  BaseRepository,
  Database,
  DatabaseInsertable,
  DatabaseUpdateable,
} from '@shared/domain/ports/base.repository';
import { sql, type Kysely } from 'kysely';
import { type InsertExpression } from 'kysely/dist/cjs/parser/insert-values-parser';
import { type UpdateObjectExpression } from 'kysely/dist/cjs/parser/update-set-parser';
import { InjectKysely } from 'nestjs-kysely';
import { isUndefined } from 'util';

export type PostgresDatabase<TDatabase extends Database> = Kysely<TDatabase>;

@Injectable()
export class PostgresRepository<TDatabase extends Database>
  implements BaseRepository<TDatabase>
{
  protected readonly schema: string;
  protected readonly databaseWithSchema: PostgresDatabase<TDatabase>;
  protected readonly tableName: string;
  constructor(
    // Do not use this "database" but only the "databaseWithSchema"
    @InjectKysely() private readonly database: PostgresDatabase<TDatabase>,
  ) {
    this.schema = process.env.DB_SCHEMA ?? 'public';
    this.databaseWithSchema = this.database.withSchema(this.schema);
  }

  async getById<T extends keyof TDatabase>(id: string): Promise<T | undefined> {
    const values = await this.databaseWithSchema
      .selectFrom(this.tableName)
      .selectAll()
      .where('id', '=', id as any)
      .execute();
    // any is authorized here because it has no impact on the return type of this method as we explicitly declare the return type
    return values[0] as any;
  }

  async save<T extends keyof TDatabase>(
    value: DatabaseInsertable<TDatabase>[T] | DatabaseUpdateable<TDatabase>[T],
  ): Promise<void> {
    const id: string = value.id!;
    const record = await this.getById(id);

    if (isUndefined(record)) {
      await this.insertOne(value);
    } else {
      await this.update(value, id);
    }
  }

  async truncate(): Promise<void> {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error(
        `You're not allowed to execute a truncate outside a test environment!`,
      );
    }
    await sql<void>`truncate table ${sql.raw(this.schema)}.${sql.raw(
      this.tableName,
    )}`.execute(this.database);
  }

  private async insertOne<T extends keyof TDatabase>(
    value: DatabaseInsertable<TDatabase>[T],
  ): Promise<void> {
    await this.databaseWithSchema
      .insertInto(this.tableName)
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      .values({
        ...value,
        metaUpdatedAt: new Date(),
        metaCreatedAt: new Date(),
      } as InsertExpression<TDatabase, string>)
      .execute();
  }

  private async update<T extends keyof TDatabase>(
    value: DatabaseUpdateable<TDatabase>[T],
    id: string,
  ): Promise<void> {
    await this.databaseWithSchema
      .updateTable(this.tableName)
      .set(
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        { ...value, metaUpdatedAt: new Date() } as UpdateObjectExpression<
          TDatabase,
          string extends keyof TDatabase ? keyof TDatabase & string : never,
          string extends keyof TDatabase ? keyof TDatabase & string : never
        >,
      )
      .where('id', '=', id as any)
      .execute();
  }
}
