import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreatePipelineDto {
  @ApiProperty({ type: 'string', description: 'Pipeline name' })
  @Type(() => String)
  @IsString()
  name: string;

  @ApiProperty({ type: 'number', description: 'Branch id' })
  @Type(() => Number)
  @IsNumber()
  branch_id: number;
}
