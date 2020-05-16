import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppConfigService } from '../../modules/global/services/config/app-config.service';

@Injectable()
export class ApidocRedirectMiddleware implements NestMiddleware {
  constructor(private readonly appConfigService: AppConfigService) {}

  use(req: Request, res: Response, next: () => void) {
    if (req.path && !req.path.includes('/apidoc')) {
      const { basePath } = this.appConfigService;

      if (
        !req.path.startsWith(basePath) ||
        req.path === basePath ||
        req.path === `${basePath}/`
      ) {
        res.redirect(`${this.appConfigService.baseUrl}/apidoc/`);
        return;
      }
    }

    next();
  }
}
