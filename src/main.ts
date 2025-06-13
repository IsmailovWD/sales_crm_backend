/* eslint-disable */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { I18nService, I18nValidationPipe } from 'nestjs-i18n';
import { setupSwagger } from './config/swagger.config';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders: '*',
    methods: '*',
  });

  if (process.env.NODE_ENV === 'development') {
    setupSwagger(app);
    Logger.log(
      '🖥️  Swagger documentation available at http://localhost:3000/api/docs',
    );
  }

  const i18n = app.get(I18nService);

  app.useGlobalPipes(new I18nValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter(i18n as I18nService));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  app.use('/:tenantId/:filename', (req, res, next) => {
    // const hTenantId = req.headers['x-tenant-id'];
    const { tenantId, filename } = req.params;
    if (tenantId == 'api') {
      next();
      return;
    }
    const path = join(__dirname, '..', '..', 'uploads', tenantId, filename);
    express.static(path)(req, res, next);
  });

  await app
    .listen(process.env.PORT as unknown as number)
    .then(() => {
      Logger.log(`🌎 Server running on port ${process.env.PORT}`);
    })
    .catch((error) => {
      Logger.error(`❌ Server failed to start: ${error} ${error.stack}`);
    });
}
bootstrap();
