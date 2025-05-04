import { Module, NestModule } from '@nestjs/common';
import { ContactsModule } from '../contacts/contacts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealActivity } from './entities/deal-activity.entity';
import { DealActivityService } from './deal-activity.service';
import { DealActivityController } from './deal-activity.controller';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DealActivity]),
    ContactsModule,
    UsersModule,
  ],
  controllers: [DealActivityController],
  providers: [DealActivityService],
  exports: [DealActivityService],
})
export class DealActivityModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(DealActivityController);
  }
}
