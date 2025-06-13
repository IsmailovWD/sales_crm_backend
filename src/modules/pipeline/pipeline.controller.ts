import { Body, Controller, Post } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePipelineDto } from './dto/pipeline-create.dto';

@ApiTags('Pipeline')
@ApiBearerAuth()
@Controller('api/v1/pipeline')
export class PipelineController {
  constructor(private readonly PipelineService: PipelineService) {}

  @Post('/')
  async create(@Body() body: CreatePipelineDto) {
    return await this.PipelineService.create(body);
  }
}
