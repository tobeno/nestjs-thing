import { Logger } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';

describe('AppLoggerService', () => {
  let service: AppLoggerService;

  beforeEach(async () => {
    service = new AppLoggerService();
    Logger.overrideLogger(false); // Disable logging
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('exception', () => {
    it('should log exceptions', () => {
      const errorMock = jest
        .spyOn(service, 'error')
        .mockImplementation(() => {});

      service.exception(new Error('message'), 'context');

      expect(errorMock).toHaveBeenCalledWith(
        'message',
        expect.any(String),
        'context',
      );
    });
  });
});
