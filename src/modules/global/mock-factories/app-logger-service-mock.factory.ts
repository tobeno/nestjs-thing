import { AppLoggerService } from '../services/logging/app-logger.service';

export class AppLoggerServiceMockFactory {
  static create(): jest.Mocked<AppLoggerService> {
    const mock: any = {
      sentryEnabled: true,
      warn: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
      exception: jest.fn(),
      setContext: jest.fn(),
    };

    return mock;
  }
}
