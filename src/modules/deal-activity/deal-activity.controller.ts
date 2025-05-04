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
} from '@nestjs/common';
import { DealActivityService } from './deal-activity.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDealActivityDto } from './dto/create-deal-activity.dto';

@ApiTags('deal-activity')
@ApiBearerAuth()
@Controller('api/v1/deal-activity')
export class DealActivityController {
  constructor(private readonly activityService: DealActivityService) {}

  @Get('all/:deal_id/:page/:limit')
  async getAllWithPagination(
    @Param('page') page: string,
    @Param('limit') limit: string,
    @Param('deal_id') deal_id: string,
  ) {
    return this.activityService.getAllWithPagination(+page, +limit, +deal_id);
  }
  @Post('create')
  async createActivity(
    @Body() body: CreateDealActivityDto,
    @Request() req: any,
  ) {
    console.log(req.user);
    return this.activityService.createActivity(body, req.user.id);
  }
}
