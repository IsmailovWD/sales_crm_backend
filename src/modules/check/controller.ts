import { Controller, Get, Post, Body } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('')
export class CheckController {
  constructor() {}

  @Get()
  async getAllUsers(@I18n() i18n: I18nContext) {
    return {
      message: i18n.translate('index.hello'),
    };
  }
}
