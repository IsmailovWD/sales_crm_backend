import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get('/:size/:page')
  async getAllUsers(
    @Param('size') size: string,
    @Param('page') page: string,
    @Request() req,
    @Query('search') search?: string,
  ) {
    return this.usersService.getAllUsers(+size, +page, search);
  }

  @Get('/me')
  async getMe(@Request() req) {
    return req.user;
  }
}
