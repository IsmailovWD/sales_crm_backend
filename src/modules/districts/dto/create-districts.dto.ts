import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateDistrictsDto {
  @IsNotEmpty()
  region_id: number | string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
