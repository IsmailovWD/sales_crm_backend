import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'User password',
    example: '123456',
  })
  @IsString({ message: i18nValidationMessage('errors.is_string', { property: 'index.password'}) })
  @IsNotEmpty({ message: i18nValidationMessage('errors.is_not_empty', { property: 'index.password'}) })
  password: string;

  @ApiProperty({
    type: String,
    description: 'User username',
    example: 'admin',
  })
  @IsString({ message: i18nValidationMessage('errors.is_string', { property: 'index.username'}) })
  @IsNotEmpty({ message: i18nValidationMessage('errors.is_not_empty', { property: 'index.username'}) })
  username: string;
}
