import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateDealStageDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  color: string;
}
