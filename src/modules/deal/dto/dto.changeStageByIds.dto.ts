import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ChangeStageByIds {
  @ApiProperty()
  @IsNumber()
  old_stage_id: number;

  @ApiProperty()
  @IsNumber()
  stage_id: number;

  @ApiProperty()
  @IsNumber({}, { each: true })
  ids: number[];
}
