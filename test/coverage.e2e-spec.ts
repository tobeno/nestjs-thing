import { INestApplication } from '@nestjs/common';
import * as express from 'express';
import { Express } from 'express';
import { promisify } from 'util';
import * as glob from 'glob';
import * as path from 'path';
import { readFile } from 'fs';
import * as expressListEndpoints from 'express-list-endpoints';
import { createTestingInstance } from './utils/setup.utils';

const globAsync = promisify(glob);
const readFileAsync = promisify(readFile);

describe('Coverage (e2e)', () => {
  let app: INestApplication;
  let expressApp: Express;

  beforeEach(async () => {
    expressApp = express();
    app = (await createTestingInstance(expressApp)).app;
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Endpoints', () => {
    it('should cover all endpoints', async () => {
      const existingEndpoints: string[] = [];
      expressListEndpoints(expressApp).forEach((endpoint) => {
        endpoint.methods.forEach((method) => {
          existingEndpoints.push(`${endpoint.path} (${method})`);
        });
      });

      const coveredEndpoints: string[] = [];
      const files: string[] = await globAsync(
        path.join(__dirname, '/**/*.e2e-spec.ts'),
      );

      await Promise.all(
        files.map(async (file) => {
          const contents = await readFileAsync(file, 'utf-8');

          // Looks for '/path (METHOD)', e.g. describe('/demo/hello (GET)')
          [
            ...contents.matchAll(
              /[^a-zA-Z0-9](\/[a-zA-Z0-9:/-]+) \(([A-Z]+)\)/g,
            ),
          ].forEach((match) => {
            coveredEndpoints.push(`${match[1]} (${match[2]})`);
          });
        }),
      );

      const uncoveredEndpoints = existingEndpoints.filter(
        (endpoint) => !coveredEndpoints.includes(endpoint),
      );

      expect(uncoveredEndpoints).toHaveLength(0);
    });
  });
});
