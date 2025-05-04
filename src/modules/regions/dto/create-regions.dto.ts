import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateRegionsDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
