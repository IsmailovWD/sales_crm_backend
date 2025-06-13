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
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { DealStageService } from './dealStage.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateDealStageDto } from './dto/update-deal-stage.dto';
import { ChangeDealStageDto } from './dto/change-deal-stage.dto';

@ApiTags('CrmStages')
@ApiBearerAuth()
@Controller('api/v1/deal-stages')
export class DealStageController {
  constructor(private readonly DealStageService: DealStageService) {}

  @Get('/all')
  async getAllDealStageWithDeals(
    @Request() req: any,
    @Query('pipeline') pipeline: string,
  ) {
    const pipeline_id = +pipeline;
    if (isNaN(pipeline_id) || isFinite(pipeline_id) === false) {
      throw new HttpException('Pipeline not found', HttpStatus.NOT_FOUND);
    }
    return this.DealStageService.getAllDealStageWithDeal(req.user, pipeline_id);
  }

  @Get('/all-only-stages')
  async getAllOnlyCrmStages() {
    return this.DealStageService.getAllOnlyStages();
  }

  @Put('/update/id/:id')
  async updateCrmStage(
    @Body() body: UpdateDealStageDto,
    @Param('id') id: string,
  ) {
    return this.DealStageService.updateCrmStage(body, +id);
  }

  @Put('/change-order')
  async changeStageOrder(
    @Body() body: ChangeDealStageDto[],
    @Request() req: any,
  ) {
    return this.DealStageService.changeStageOrder(body, req.user);
  }
}
