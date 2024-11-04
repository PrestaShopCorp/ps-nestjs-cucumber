import { Module } from '@nestjs/common';
import { PostgresDialect } from 'kysely';
import { KyselyModule } from 'nestjs-kysely';
import { Pool } from 'pg';

@Module({
  imports: [
    KyselyModule.forRoot({
      dialect: new PostgresDialect({
        pool: new Pool({
          database: process.env.DB_DATABASE ?? 'basket',
          password: process.env.DB_PASSWORD ?? 'admin',
          user: process.env.DB_USER ?? 'admin',
          host: process.env.DB_HOST ?? 'localhost',
          port: +(process.env.DB_PORT ?? 5434),
        }),
      }),
    }),
  ],
  providers: [],
})
export class SharedModule {}
