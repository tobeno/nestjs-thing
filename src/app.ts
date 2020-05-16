import { NestFactory } from '@nestjs/core';
import { Express } from 'express';
import {
  INestApplication,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { AppConfigService } from './modules/global/services/config/app-config.service';
import { AppLoggerService } from './modules/global/services/logging/app-logger.service';

export function useValidation(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
}

export async function createApp(
  expressApp: Express,
): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  const appConfigService = app.get(AppConfigService);

  app.useLogger(await app.resolve(AppLoggerService));

  app.use(helmet());

  useValidation(app);

  app.enableCors();

  app.setGlobalPrefix(appConfigService.prefix);

  return app;
}
