import { Request } from 'express';

export class RequestMockFactory {
  static create(request: Partial<Request> = {}): jest.Mocked<Request> {
    return {
      url: 'http://localhost',
      method: 'get',
      header: jest.fn(),
      ...request,
    } as any;
  }
}
