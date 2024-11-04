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
      database: 'basket',
      password: 'admin',
      user: 'admin',
      host: 'localhost',
      port: 5434,
    }),
  },
});
