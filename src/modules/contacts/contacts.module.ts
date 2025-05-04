import { Module, NestModule } from '@nestjs/common';
import { Contacts } from './entities/contacts.entity';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Contacts]), UsersModule],
  providers: [ContactsService],
  controllers: [ContactsController],
  exports: [ContactsService],
})
export class ContactsModule implements NestModule {
  configure(consumer) {
    consumer.apply(AuthMiddleware).forRoutes(ContactsController);
  }
}
