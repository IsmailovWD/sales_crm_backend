import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}
  async catch(exception: HttpException & { errors: any }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;
    let errors = exception.errors || [];
    if (errors.length > 0) {
      errors = await ErrorMapper(errors, this.i18n);
    }
    response.status(status).json({
      success: false,
      statusCode: status,
      message:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse.message || 'An error occurred',
      errors: errors || [],
    });
  }
}
async function ErrorMapper(errors: any, i18n: I18nService, list = []) {
  if (Array.isArray(errors)) {
    await Promise.all(
      errors.map(async (error: any) => {
        for (const key in error.constraints) {
          list.push(
            await i18n.t(error.constraints[key].split('|')[0], {
              args: {
                property: await i18n.t(`index.${error.property}`),
              },
            }),
          );
        }
        if (Array.isArray(error.children)) {
          await ErrorMapper(error.children, i18n, list);
        }
      }),
    );
  }
  return list;
}
