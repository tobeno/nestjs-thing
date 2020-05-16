import {
  Module,
  ClassSerializerInterceptor,
  OnModuleInit,
  HttpModule,
  HttpService,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DemoModule } from './modules/demo/demo.module';
import { HTTP_CONFIG_DEFAULT } from './constants/http.constants';
import { GlobalModule } from './modules/global/global.module';
import { ApidocRedirectMiddleware } from './middlewares/apidoc-redirect/apidoc-redirect.middleware';

@Module({
  imports: [DemoModule, GlobalModule, HttpModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    ApidocRedirectMiddleware,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly httpService: HttpService) {}

  onModuleInit(): void {
    // We don't use HttpModule.register to avoid registering the interceptors multiple times
    this.httpService.axiosRef.defaults = {
      ...this.httpService.axiosRef.defaults,
      ...HTTP_CONFIG_DEFAULT,
    };
  }
}
