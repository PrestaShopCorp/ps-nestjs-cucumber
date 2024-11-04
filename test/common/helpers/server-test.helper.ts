import { INestApplication, Type } from '@nestjs/common';
import {
  Test,
  type TestingModule,
  type TestingModuleBuilder,
} from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';

export class ServerTestHelper {
  private constructor(
    readonly application: INestApplication,
    readonly testingModule: TestingModule,
  ) {}

  /**
   * Starts the server for testing purposes.
   *
   * @returns {Promise<ServerTestHelper>} - A promise that resolves to an instance of ServerTestHelper.
   */
  static async start(): Promise<ServerTestHelper> {
    const testingModuleBuilder: TestingModuleBuilder = Test.createTestingModule(
      {
        imports: [AppModule],
      },
    );

    const testingModule: TestingModule = await testingModuleBuilder.compile();

    const application = testingModule.createNestApplication();
    await application.init();

    await application.listen(process.env.APP_PORT);

    return new ServerTestHelper(application, testingModule);
  }

  static async stop(server: ServerTestHelper): Promise<void> {
    await server.application.close();
  }

  getProvider<TProvider>(provider: Type<TProvider> | string): TProvider {
    return this.testingModule.get<TProvider>(provider);
  }
}
