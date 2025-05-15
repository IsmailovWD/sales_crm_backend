import { ConfigService, registerAs } from '@nestjs/config';

export const DataSourceConfig = registerAs('dataSourceConfig', () => {
  const configService = new ConfigService();

  return {
    type: configService.getOrThrow('DB_TYPE'),
    host: configService.getOrThrow('DB_HOST'),
    port: configService.getOrThrow('DB_PORT'),
    username: configService.getOrThrow('DB_USER'),
    password: configService.getOrThrow('DB_PASSWORD'),
    database: configService.getOrThrow('DB_NAME'),
    logging: configService.getOrThrow('NODE_ENV') === 'development',
  };
});
