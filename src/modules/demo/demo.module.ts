import { Module } from '@nestjs/common';
import { HelloService } from './services/hello/hello.service';
import { HelloController } from './controllers/hello/hello.controller';

@Module({
  providers: [HelloService],
  controllers: [HelloController],
})
export class DemoModule {}
