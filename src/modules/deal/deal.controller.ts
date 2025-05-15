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
import { DealService } from './deal.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DealCreateDto } from './dto/deal-create.dto';
import { ChangeStageByIds } from './dto/dto.changeStageByIds.dto';

@ApiTags('CrmLead')
@ApiBearerAuth()
@Controller('api/v1/deals')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Get('/all/:size/:stage')
  getAll(@Param('size') size: string, @Param('stage') stage: string) {
    return this.dealService.getAll(+size, +stage);
  }

  @Post('/create')
  create(@Body() data: DealCreateDto, @Request() req) {
    return this.dealService.create(data, req.user);
  }

  @Patch('/update/id/:id')
  update(@Param('id') id: string, @Body() data: DealCreateDto, @Request() req) {
    return this.dealService.update(data, +id, req.user.id);
  }

  @Get('/id/:id')
  getById(@Param('id') id: string) {
    return this.dealService.getById(+id);
  }

  @Patch('/change-stage-by-ids')
  changeStageByIds(@Body() data: ChangeStageByIds, @Request() req) {
    return this.dealService.changeStageByIds(
      data.ids,
      data.stage_id,
      data.old_stage_id,
      req.user.id,
    );
  }
}
