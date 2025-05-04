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
import { DeliveryManService } from './deliveryMan.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateDeliveryManDto } from './dto/update-deliveryMan.dto';
import { CreateDeliveryManDto } from './dto/create-deliveryMan.dto';

@ApiTags('Delivery Man')
@ApiBearerAuth()
@Controller('api/v1/delivery-man')
export class DeliveryManController {
  constructor(private readonly DeliveryManService: DeliveryManService) {}

  @Get('/all/:page/:limit')
  @ApiQuery({ name: 'search', required: false })
  async getAll(
    @Param('page') page: string,
    @Param('limit') limit: string,
    @Query('search') search?: string,
  ) {
    return this.DeliveryManService.getAll(+limit, +page, search);
  }

  @Put('/update/id/:id')
  async updateDelivery(
    @Body() body: UpdateDeliveryManDto,
    @Param('id') id: string,
  ) {
    return this.DeliveryManService.update(body, +id);
  }

  @Post('/create')
  async createDelivery(@Body() body: CreateDeliveryManDto) {
    return this.DeliveryManService.create(body);
  }

  @Delete('/delete/id/:id')
  async deleteDelivery(@Param('id') id: string) {
    return this.DeliveryManService.delete(+id);
  }
}
