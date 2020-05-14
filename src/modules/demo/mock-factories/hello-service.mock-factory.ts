import { HelloService } from '../services/hello/hello.service';

export class HelloServiceMockFactory {
  static create(data: Partial<HelloService> = {}): jest.Mocked<HelloService> {
    return {
      getHello: jest.fn(),
      ...data,
    } as any;
  }
}
