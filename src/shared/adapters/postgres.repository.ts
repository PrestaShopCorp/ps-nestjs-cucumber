import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared/domain/ports/base.repository';
import { sql, type Kysely } from 'kysely';
import { isUndefined } from 'util';

// TODO improve type to have a typesafe implementation
export type PostgresDatabase = Kysely<any>;

@Injectable()
export class PostgresRepository<TTableTuple extends { id: string }>
  implements BaseRepository<TTableTuple>
{
  protected readonly schema: string;
  protected readonly databaseWithSchema: PostgresDatabase;
  constructor(
    // Do not use this "database" but only the "databaseWithSchema"
    private readonly database: PostgresDatabase,
    protected readonly tableName: string,
  ) {
    this.schema = process.env.DB_SCHEMA ?? 'public';
    this.databaseWithSchema = this.database.withSchema(this.schema);
  }

  async getById(id: string): Promise<TTableTuple | undefined> {
    const values = await this.databaseWithSchema
      .selectFrom(this.tableName)
      .selectAll()
      .where('id', '=', id as any)
      .execute();
    // any is authorized here because it has no impact on the return type of this method as we explicitly declare the return type
    return values[0] as any;
  }

  async save(value: TTableTuple): Promise<void> {
    const id: string = value.id;
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

  private async insertOne(value: TTableTuple): Promise<void> {
    const query = this.databaseWithSchema.insertInto(this.tableName).values({
      ...value,
    });

    await query.execute();
  }

  private async update(value: TTableTuple, id: string): Promise<void> {
    const query = this.databaseWithSchema
      .updateTable(this.tableName)
      .set({ ...value })
      .where('id', '=', id as any);

    await query.execute();
  }
}
