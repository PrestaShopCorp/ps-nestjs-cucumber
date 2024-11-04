import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import { ServerTestHelper } from 'test/common/helpers/server-test.helper';

export let server: ServerTestHelper;

BeforeAll(async function (): Promise<void> {
  process.env.TZ = 'GMT';

  server = await ServerTestHelper.start();
});

AfterAll({ timeout: 5000 }, async function (): Promise<void> {
  await ServerTestHelper.stop(server);
});
