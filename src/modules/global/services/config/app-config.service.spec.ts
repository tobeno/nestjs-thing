import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfigService],
      imports: [ConfigModule.forRoot()],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.each([
    [{ PORT: '3100' }, { port: 3100 }],
    [{}, { port: 3000 }],
    [
      { BASE_URL: 'http://localhost:3000', PREFIX: 'v2' },
      { prefix: 'v2', basePath: '/v2', baseUrl: 'http://localhost:3000/v2' },
    ],
    [{ PREFIX: 'v2' }, { prefix: 'v2' }],
  ])(
    'should create config for env %j matching %j',
    (
      env: { [name: string]: string },
      expectedConfig: { [name: string]: any },
    ) => {
      const configServiceMock: ConfigService = {
        get: (name: string, defaultValue?: string): string =>
          env[name] || defaultValue,
      } as any;

      service = new AppConfigService(configServiceMock);

      expect(service).toMatchObject(expectedConfig);
    },
  );
});
