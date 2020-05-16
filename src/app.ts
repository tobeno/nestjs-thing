import { NestFactory } from '@nestjs/core';
import { Express } from 'express';
import {
  INestApplication,
  ValidationPipe,
  BadRequestException,
  Type,
  Abstract,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { AppConfigService } from './modules/global/services/config/app-config.service';
import { AppLoggerService } from './modules/global/services/logging/app-logger.service';
import { ApidocRedirectMiddleware } from './middlewares/apidoc-redirect/apidoc-redirect.middleware';

function useMiddleware(
  app: INestApplication,
  typeOrToken: string | symbol | Type<any> | Abstract<any>,
): void {
  const middleware = app.get(typeOrToken);
  app.use(middleware.use.bind(middleware));
}

function useSwagger(app: INestApplication): void {
  const configService = app.get(AppConfigService);

  const options = new DocumentBuilder()
    .setTitle(`nestjs-thing`)
    .setDescription('An NestJS API')
    .setVersion(configService.version);

  // Tags
  const tags: { [tag: string]: { description: string } } = {
    // ToDo: Add API tags here
  };

  Object.entries(tags).forEach(([tagName, tagInfo]) => {
    options.addTag(tagName, tagInfo.description);
  });

  // Servers
  const servers = {
    [configService.baseUrl]: {
      description: `Current API`,
    },
  };

  Object.entries(servers).forEach(([serverUrl, serverInfo]) => {
    options.addServer(serverUrl, serverInfo.description);
  });

  // Specification
  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup(`${configService.basePath}/apidoc`, app, document);
}

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

  useMiddleware(app, ApidocRedirectMiddleware);
  useValidation(app);

  app.enableCors();

  useSwagger(app);

  app.setGlobalPrefix(appConfigService.prefix);

  return app;
}
