import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ClsService } from 'nestjs-cls';
import { TENANT_KEY } from 'src/libs/tenancy/tenancy.constants';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cls: ClsService,
  ) {}

  async signIn(username: string, pass: string): Promise<{ token: string }> {
    const { password, ...user } =
      await this.usersService.findOneByUsername(username);

    if (await this.comparePassword(pass, password)) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.username,
      tenantId: this.cls.get(TENANT_KEY),
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: process.env.SECRET_JWT + this.cls.get(TENANT_KEY),
    });

    return {
      ...user,
      token,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
