import { Module } from '@nestjs/common';
import { DemoModule } from './modules/demo/demo.module';
import { GlobalModule } from './modules/global/global.module';

@Module({
  imports: [DemoModule, GlobalModule],
})
export class AppModule {}
