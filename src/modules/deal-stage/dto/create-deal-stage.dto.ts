import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateDealStageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  order: number;

  @IsNotEmpty()
  @IsNumber()
  pipeline_id: number;
}
