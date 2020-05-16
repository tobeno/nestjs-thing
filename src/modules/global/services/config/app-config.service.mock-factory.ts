import { ConfigService } from '@nestjs/config';
import { AppConfigService } from './app-config.service';

export class AppConfigServiceMockFactory {
  static create(
    config: Partial<{ [name in keyof AppConfigService]: any }> = {},
  ): AppConfigService {
    let mock: any = {};

    const configService = new AppConfigService(new ConfigService({}));
    Object.getOwnPropertyNames(configService).forEach((key) => {
      mock[key] = (configService as any)[key];
    });

    mock = {
      ...mock,
      environment: 'test',
      userAppUrl: 'https://www.limehome.com',
      ...config,
    };

    return mock;
  }
}
