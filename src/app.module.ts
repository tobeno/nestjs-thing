import { Module } from '@nestjs/common';
import { DemoModule } from './modules/demo/demo.module';

@Module({
  imports: [DemoModule],
})
export class AppModule {}
