import { Pool } from 'pg';
import { defineConfig } from 'kysely-ctl';

/**
 * Config for migrations and seeds.
 * For more info: https://github.com/kysely-org/kysely-ctl?tab=readme-ov-file#configuration
 * */
export default defineConfig({
  dialect: 'pg',
  dialectConfig: {
    pool: new Pool({
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: +process.env.DB_PORT!,
    }),
  },
});
