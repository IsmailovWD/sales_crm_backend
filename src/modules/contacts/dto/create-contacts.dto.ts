import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateContactsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((o) => o.phone_number !== null)
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsBoolean()
  is_client: boolean;

  @IsNotEmpty()
  @IsBoolean()
  is_supplier: boolean;

  @IsNotEmpty()
  @IsString()
  dial_code: string;

  @IsNotEmpty()
  @IsString()
  country_code: string;

  @ValidateIf((o) => o.region_id !== null)
  @IsNumber()
  region_id: number;

  @ValidateIf((o) => o.district_id !== null)
  @IsNumber()
  district_id: number;
}
