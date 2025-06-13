import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Pipeline } from './entities/pipeline.entity';
import { DatabaseService } from '../../libs/database/database.service';
import { CreatePipelineDto } from './dto/pipeline-create.dto';
import { DEFAULT_DELIVERY_STAGES } from '../../utils/defaultStages.utils';
import { DealStageService } from '../deal-stage/dealStage.service';

@Injectable()
export class PipelineService extends BaseService<Pipeline> {
  constructor(
    protected readonly databaseService: DatabaseService,
    private readonly dealService: DealStageService,
  ) {
    super(databaseService, Pipeline);
  }
  async create(body: CreatePipelineDto) {
    return await this._base_transaction(async (manager) => {
      const pipeline = await this.getRepo(manager).save(body);
      const defaultStages = DEFAULT_DELIVERY_STAGES.map((s) => ({
        ...s,
        pipeline_id: pipeline.id,
      }));
      await this.dealService.bulkCreateStages(defaultStages, manager);
      return pipeline;
    });
  }
}
