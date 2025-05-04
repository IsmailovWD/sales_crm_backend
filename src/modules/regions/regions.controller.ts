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
import { RegionsService } from './regions.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateRegionsDto } from './dto/update-regions.dto';
import { CreateRegionsDto } from './dto/create-regions.dto';

@ApiTags('Regions')
@ApiBearerAuth()
@Controller('api/v1/regions')
export class RegionsController {
  constructor(private readonly RegionsService: RegionsService) {}

  @Get('/all')
  async getAllRegions() {
    return this.RegionsService.getAll();
  }

  @Put('/id/:id')
  async updateRegions(@Body() body: UpdateRegionsDto, @Param('id') id: string) {
    return this.RegionsService.update(body, +id);
  }

  @Post('/create')
  async createRegions(@Body() body: CreateRegionsDto) {
    return this.RegionsService.create(body);
  }

  @Delete('/delete/id/:id')
  async deleteRegions(@Param('id') id: string) {
    return this.RegionsService.delete(+id);
  }

  @Get('/id/:id/with-districts')
  async getByIdWithDistricts(@Param('id') id: string) {
    return this.RegionsService.getByIdWithDistricts(+id);
  }

  @Get('/all/with-districts')
  async getAllWithDistricts() {
    return this.RegionsService.getAllWithDistricts();
  }
}
