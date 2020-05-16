import * as express from 'express';
import { createApp } from './app';
import { AppConfigService } from './modules/global/services/config/app-config.service';

async function bootstrap() {
  const app = await createApp(express());
  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
}
bootstrap();
