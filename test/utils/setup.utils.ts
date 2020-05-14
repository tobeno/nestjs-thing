import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../../src/app.module';

/**
 * Creates a NestJs app the Main Module for Testing
 */
export async function createTestingInstance(
  expressApp: Express = null,
): Promise<{
  app: INestApplication;
  module: TestingModule;
}> {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module.createNestApplication(
    expressApp ? new ExpressAdapter(expressApp) : null,
  );
  await app.init();

  return {
    app,
    module,
  };
}
