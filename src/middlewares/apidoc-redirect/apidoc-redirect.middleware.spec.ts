import { ApidocRedirectMiddleware } from './apidoc-redirect.middleware';
import { AppConfigService } from '../../modules/global/services/config/app-config.service';
import { AppConfigServiceMockFactory } from '../../modules/global/mock-factories/app-config-service-mock.factory';
import { RequestMockFactory } from '../../mock-factories/request-mock.factory';
import { ResponseMockFactory } from '../../mock-factories/response-mock.factory';

describe('ApidocRedirectMiddleware', () => {
  let configServiceMock: jest.Mocked<AppConfigService>;
  let middleware: ApidocRedirectMiddleware;

  beforeEach(() => {
    configServiceMock = AppConfigServiceMockFactory.create({
      prefix: 'v1',
      basePath: '/v1',
      baseUrl: 'http://localhost:3100/v1',
    });
    middleware = new ApidocRedirectMiddleware(configServiceMock);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  describe('use', () => {
    it('should ignore endpoint calls', () => {
      const reqMock = RequestMockFactory.create({
        path: '/v1/public/customer',
      });
      const resMock = ResponseMockFactory.create();
      const nextMock = jest.fn();

      middleware.use(reqMock, resMock, nextMock);

      expect(resMock.redirect).not.toHaveBeenCalled();
      expect(nextMock).toHaveBeenCalled();
    });

    it('should redirect calls outside prefix', () => {
      const reqMock = RequestMockFactory.create({
        path: '/',
      });
      const resMock = ResponseMockFactory.create();
      const nextMock = jest.fn();

      middleware.use(reqMock, resMock, nextMock);

      expect(resMock.redirect).toHaveBeenCalledWith(
        'http://localhost:3100/v1/apidoc/',
      );
    });

    it('should redirect calls to root', () => {
      const reqMock = RequestMockFactory.create({
        path: '/v1',
      });
      const resMock = ResponseMockFactory.create();
      const nextMock = jest.fn();

      middleware.use(reqMock, resMock, nextMock);

      expect(resMock.redirect).toHaveBeenCalledWith(
        'http://localhost:3100/v1/apidoc/',
      );
    });

    it('should redirect calls to root with trailing slash', () => {
      const reqMock = RequestMockFactory.create({
        path: '/v1/',
      });
      const resMock = ResponseMockFactory.create();
      const nextMock = jest.fn();

      middleware.use(reqMock, resMock, nextMock);

      expect(resMock.redirect).toHaveBeenCalledWith(
        'http://localhost:3100/v1/apidoc/',
      );
    });
  });
});
