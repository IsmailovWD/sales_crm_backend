import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
  MinLength,
  MaxLength,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateContactsDto } from '../../contacts/dto/create-contacts.dto';

export class OrdersDto {
  @ApiProperty()
  @IsNumber()
  product_id: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  summa: number;
}

export class DealCreateDto {
  @ApiPropertyOptional({ example: 'Deal #001' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  title?: string | null;

  @ApiProperty({ example: 1 })
  @IsNumber()
  deal_stage_id: number;

  @ApiPropertyOptional({ type: [String], example: ['important', 'urgent'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ example: 150000 })
  @IsNumber()
  summa: number;

  @ApiProperty({ type: () => CreateContactsDto })
  @ValidateNested()
  @Type(() => CreateContactsDto)
  contact: CreateContactsDto;

  @ApiPropertyOptional({ type: [OrdersDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrdersDto)
  orders: OrdersDto[];

  @ApiPropertyOptional({ example: 12 })
  @IsOptional()
  @IsNumber()
  deliveryman_id?: number | null;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsNumber()
  delivery_date?: number | null;

  @ApiPropertyOptional({ example: 7 })
  @IsOptional()
  @IsNumber()
  region_id?: number | null;

  @ApiPropertyOptional({ example: 23 })
  @IsOptional()
  @IsNumber()
  district_id?: number | null;

  @ApiPropertyOptional({ example: 'Chilonzor, 7-kvartal, 12-uy' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  address?: string | null;

  @ApiPropertyOptional({ example: 'Customer prefers evening delivery.' })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  comment?: string | null;
}
