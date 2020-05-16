import { NestFactory } from '@nestjs/core';
import { Express } from 'express';
import { INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppConfigService } from './modules/global/services/config/app-config.service';

export async function createApp(
  expressApp: Express,
): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  const appConfigService = app.get(AppConfigService);

  app.setGlobalPrefix(appConfigService.prefix);

  return app;
}
