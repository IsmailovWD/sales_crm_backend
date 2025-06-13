import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  ArrayMinSize,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Ism bo‘sh bo‘lishi mumkin emas' })
  fullName: string;

  @IsString()
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak' })
  password: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsNumber()
  salary: number;

  @IsNumber()
  sales_kpi: number;

  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  branch_ids: number[];
}
