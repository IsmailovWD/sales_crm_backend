import {
  ArrayMinSize,
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

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

  @IsNotEmpty()
  @IsNumber()
  branch_id: number;
}
