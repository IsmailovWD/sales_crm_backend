import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ChangeDealStageDto {
  @IsNotEmpty()
  @IsString()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  order: number;
}
