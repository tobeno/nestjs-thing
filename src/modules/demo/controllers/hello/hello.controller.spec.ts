import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';
import { HelloService } from '../../services/hello/hello.service';
import { HelloServiceMockFactory } from '../../services/hello/hello.service.mock-factory';

describe('Hello Controller', () => {
  let controller: HelloController;
  let helloServiceMock: jest.Mocked<HelloService>;

  beforeEach(async () => {
    helloServiceMock = HelloServiceMockFactory.create();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [
        {
          provide: HelloService,
          useValue: helloServiceMock,
        },
      ],
    }).compile();

    controller = module.get<HelloController>(HelloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      helloServiceMock.getHello.mockReturnValueOnce('Hello World!');

      expect(controller.getHello()).toBe('Hello World!');
    });
  });
});
