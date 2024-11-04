import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import {
  deleteSchema,
  migrateToLatest,
} from 'test/common/helpers/migrate-postgres';
import { randomSchemaName } from 'test/common/helpers/random-schema-name';
import { ServerTestHelper } from 'test/common/helpers/server-test.helper';

export let server: ServerTestHelper;

BeforeAll(async function (): Promise<void> {
  process.env.TZ = 'GMT';
  process.env.DB_SCHEMA = randomSchemaName();

  await migrateToLatest(process.env.DB_SCHEMA);

  console.log(
    `All migrations applied to the read model database in schema ${process.env.DB_SCHEMA}`,
  );

  server = await ServerTestHelper.start();
});

AfterAll({ timeout: 5000 }, async function (): Promise<void> {
  await ServerTestHelper.stop(server);
  await deleteSchema(process.env.DB_SCHEMA!);
});
