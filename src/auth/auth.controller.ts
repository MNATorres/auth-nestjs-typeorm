import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { Roles } from './decorators/roles.decorator';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/service/users.service';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from './decorators/auth.decorator';

interface IRequestWithUser extends Request {
  user: {
    email: string;
    role: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Get('profile')
  // @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  // profile(@Req() req: IRequestWithUser) {
  //   return this.authService.profile(req.user);
  // }

  @Get('profile')
  @Auth(Role.ADMIN)
  profile(@Req() req: IRequestWithUser) {
    return this.authService.profile(req.user);
  }
}
