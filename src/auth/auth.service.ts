import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

import { UsersService } from 'src/users/service/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findOneByEmail(registerDto.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcryptjs.hash(registerDto.password, 10);

    await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return {
      name: registerDto.name,
      email: registerDto.email,
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmailWithPassword(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isPasswordValid = await bcryptjs.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const payload = { email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);
    const body = {
      user: {
        email: user.email,
        role: user.role,
        name: user.name,
      },
      accessToken
    }

    return {
      body,
    };
  }

  async profile({ email, role }: { email: string; role: string }) {
    // if (role !== 'admin') {
    //   throw new UnauthorizedException(
    //     'You are not authorized to access this resource',
    //   );
    // }
    
    return await this.userService.findOneByEmail(email);
  }
}
