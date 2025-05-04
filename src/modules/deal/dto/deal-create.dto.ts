import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateContactsDto } from '../../contacts/dto/create-contacts.dto';

export class OrdersDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  summa: number;
}

export class DealCreateDto {
  @IsOptional()
  @IsString()
  title?: string | null;

  @IsNumber()
  deal_stage_id: number;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsNumber()
  summa: number;

  @ValidateNested()
  @Type(() => CreateContactsDto)
  contact: CreateContactsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrdersDto)
  orders: OrdersDto[];
}
