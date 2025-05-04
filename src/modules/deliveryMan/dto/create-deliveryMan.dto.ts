import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsDecimal,
  IsMongoId,
  Length,
  IsNumber,
  Min,
  IsInt,
} from 'class-validator';

export class CreateDeliveryManDto {
  @IsString()
  name: string;

  @IsString()
  phone_number: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  dial_code: string;

  @IsOptional()
  @IsString()
  country_code?: string;

  @IsOptional()
  @IsNumber()
  region_id?: number;

  @IsOptional()
  @IsNumber()
  district_id?: number;

  @IsEnum(['salary', 'percent', 'none', 'summa'])
  salary_type: string;

  @IsNumber()
  @Min(0)
  salary_value: number;

  @IsBoolean()
  werehouse_available: boolean;
}
