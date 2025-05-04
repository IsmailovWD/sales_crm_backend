// src/database/database.module.ts
import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isDev =
          (await configService.get<string>('NODE_ENV')) === 'development';
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT') || '5432'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [__dirname + '/../**/*.entity.{ts,js}'],
          synchronize: isDev,
          autoLoadEntities: true,
          logging: isDev,
        };
      },
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      if (this.dataSource.isInitialized) {
        this.logger.log('✅ PostgreSQL bazasiga muvaffaqiyatli ulandi!');
      } else {
        await this.dataSource.initialize();
        this.logger.log('✅ PostgreSQL bazasiga endi ulandi!');
      }
    } catch (err) {
      this.logger.error('❌ PostgreSQL ulanishida xatolik:', err);
    }
  }
}
