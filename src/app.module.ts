import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DemoModule } from './modules/demo/demo.module';
import { GlobalModule } from './modules/global/global.module';

@Module({
  imports: [DemoModule, GlobalModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
