import * as express from 'express';
import { createApp } from './app';

async function bootstrap() {
  const app = await createApp(express());
  await app.listen(3000);
}
bootstrap();
