import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port() {
    return parseInt(this.configService.get<string>('PORT', '3000'), 10);
  }

  get prefix() {
    return this.configService.get<string>('PREFIX');
  }

  get version() {
    return this.configService.get<string>('VERSION');
  }

  get basePath() {
    return `/${this.prefix}`;
  }

  get baseUrl() {
    return `${this.configService.get<string>('BASE_URL')}${this.basePath}`;
  }
}
