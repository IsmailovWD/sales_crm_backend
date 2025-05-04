import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import * as Modules from './modules';
import { I18nModule } from './i18n/i18n.module';
import { JwtModule } from '@nestjs/jwt';
import { SocketModule } from './sockets.io/socketIo.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    I18nModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          global: true,
          secret: config.SECRET_JWT ?? 'secret',
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
    SocketModule,
    ...Object.values(Modules),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
