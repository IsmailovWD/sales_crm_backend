import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ClsService } from 'nestjs-cls';
import { I18nService } from 'nestjs-i18n';
import { TENANT_KEY } from 'src/libs/tenancy/tenancy.constants';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(I18nService) private readonly i18n: I18nService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];
      const tenantId = req.headers['x-tenant-id'];
      const Bearer = 'Bearer ';
      if (!authHeader || !authHeader.startsWith(Bearer)) {
        throw new HttpException(
          await this.i18n.translate('errors.token_required'),
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new HttpException(
          await this.i18n.translate('errors.invalid_token_format'),
          HttpStatus.UNAUTHORIZED,
        );
      }
      const secretKey = process.env.SECRET_JWT! + tenantId;

      const decoded = jwt.verify(token, secretKey);

      if (!decoded) {
        throw new HttpException(
          await this.i18n.translate('errors.invalid_or_expired_token'),
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (decoded['tenantId'] !== tenantId) {
        throw new HttpException(
          await this.i18n.translate('errors.invalid_or_expired_token'),
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (!decoded['sub']) {
        throw new HttpException(
          await this.i18n.translate('errors.invalid_or_expired_token'),
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        const { password, ...user } = await this.usersService.findOne(
          +decoded['sub'],
        );

        req['user'] = user;
      }

      next();
    } catch (error) {
      throw new HttpException(
        await this.i18n.translate('errors.invalid_or_expired_token'),
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
