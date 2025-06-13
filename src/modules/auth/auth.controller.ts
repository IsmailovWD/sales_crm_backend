import { Controller, Post, Body } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async getAllUsers(@I18n() i18n: I18nContext, @Body() body: LoginDto) {
    const { username, password } = body;

    const result = await this.authService.signIn(username, password);

    return result;
  }
}
