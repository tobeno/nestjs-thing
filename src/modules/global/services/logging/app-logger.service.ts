import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService extends Logger {
  exception(e: any, context?: string) {
    this.error(e.message || e, e.stack, context);
  }
}
