import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('HelloController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/demo/hello (GET)', () => {
    // eslint-disable-next-line jest/expect-expect
    it('should return 200', async () => {
      const response = await request(app.getHttpServer())
        .get('/demo/hello')
        .expect(200);

      expect(response.text).toBe('Hello World!');
    });
  });
});
