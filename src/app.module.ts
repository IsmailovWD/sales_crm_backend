import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { DatabaseModule } from './database/database.module';
import * as Modules from './modules';
import { I18nModule } from './i18n/i18n.module';
import { JwtModule } from '@nestjs/jwt';
import { SocketModule } from './sockets.io/socketIo.module';
import config from './config/config';
import { DatabaseModule } from './libs/database/database.module';
import { TenancyModule } from './libs/tenancy/tenancy.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TenancyModule,
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
    // SocketModule,
    ...Object.values(Modules),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      serveRoot: '/default',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
