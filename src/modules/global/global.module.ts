import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './services/config/app-config.service';
import { AppLoggerService } from './services/logging/app-logger.service';

/**
 * Module containing global services that are needed everywhere.
 *
 * Important: This module should stay as small as possible.
 * We should only use it for real superglobal stuff.
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AppConfigService, AppLoggerService],
  exports: [AppConfigService, AppLoggerService],
})
export class GlobalModule {}
