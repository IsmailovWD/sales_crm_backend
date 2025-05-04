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
import { DistrictsService } from './districts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateDistrictsDto } from './dto/update-districts.dto';
import { CreateDistrictsDto } from './dto/create-districts.dto';

@ApiTags('Districts')
@ApiBearerAuth()
@Controller('api/v1/districts')
export class DistrictsController {
  constructor(private readonly DistrictsService: DistrictsService) {}

  @Get('/all')
  async getAllDistricts() {
    return this.DistrictsService.getAll();
  }

  @Put('/id/:id')
  async updateDistricts(
    @Body() body: UpdateDistrictsDto,
    @Param('id') id: string,
  ) {
    return this.DistrictsService.update(body, +id);
  }

  @Post('/create')
  async createDistricts(@Body() body: CreateDistrictsDto) {
    return this.DistrictsService.create(body);
  }

  @Delete('/delete/id/:id')
  async deleteDistricts(@Param('id') id: string) {
    return this.DistrictsService.delete(+id);
  }
}
