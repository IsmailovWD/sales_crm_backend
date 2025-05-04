import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateContactsDto } from './dto/update-contacts.dto';
import { CreateContactsDto } from './dto/create-contacts.dto';

@ApiTags('Contacts')
@ApiBearerAuth()
@Controller('api/v1/contacts')
export class ContactsController {
  constructor(private readonly ContactsService: ContactsService) {}

  @Get('/clients/all/:page/:limit')
  @ApiQuery({ name: 'search', required: false })
  async getAllClients(
    @Param('page') page: string,
    @Param('limit') limit: string,
    @Query('search') search?: string,
  ) {
    return this.ContactsService.getAll(+limit, +page, 'client', search);
  }

  @Get('/suppliers/all/:page/:limit')
  @ApiQuery({ name: 'search', required: false })
  async getAllSuppliers(
    @Param('page') page: string,
    @Param('limit') limit: string,
    @Query('search') search?: string,
  ) {
    return this.ContactsService.getAll(+limit, +page, 'supplier', search);
  }

  @Put('/update/id/:id')
  async updateContacts(
    @Body() body: UpdateContactsDto,
    @Param('id') id: string,
  ) {
    return this.ContactsService.update(body, id);
  }

  @Post('/create')
  async createContacts(@Body() body: CreateContactsDto) {
    return this.ContactsService.create(body);
  }

  @Delete('/delete/id/:id')
  async deleteContacts(@Param('id') id: string) {
    return this.ContactsService.delete(id);
  }
}
