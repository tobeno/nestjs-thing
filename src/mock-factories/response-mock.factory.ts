import { Response } from 'express';

export class ResponseMockFactory {
  static create(response: Partial<Response> = {}): jest.Mocked<Response> {
    return {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      redirect: jest.fn().mockReturnThis(),
      setHeader: jest.fn().mockReturnThis(),
      ...response,
    } as any;
  }
}
