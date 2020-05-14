import { Controller, Get } from '@nestjs/common';
import { HelloService } from '../../services/hello/hello.service';

@Controller('demo/hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(): string {
    return this.helloService.getHello();
  }
}
